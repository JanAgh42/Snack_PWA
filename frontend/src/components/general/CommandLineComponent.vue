<template>
  <section class="width rounded-borders">
    <q-input
      v-model="cmdStore.commandLineInput"
      @keyup.enter="executeCommand"
      placeholder="Type your command..."
      class="rounded-borders q-px-md q-py-xs bkg-primary"
      :input-style="{ color: `rgb(${getInputColor})` }"
      borderless
      rounded
      dense
    >
      <q-icon
        name="send"
        class="full-height cursor-pointer"
        size="22px"
        color="white"
        @click="executeCommand"
      />
    </q-input>
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import Commands, { commandValues } from 'app/src/enums/commands';
import { useGroupStore } from 'src/stores/groupStore';
import { useAuthenticationStore } from 'src/stores/authenticationStore';
import { useApplicationStore } from 'src/stores/applicationStore';
import { useCommandLineStore } from 'src/stores/cmdStore';
import groupService from 'src/api/services/groupService';
import { colorValues } from 'src/enums/colors';

const groupStore = useGroupStore();
const authStore = useAuthenticationStore();
const appStore = useApplicationStore();
const cmdStore = useCommandLineStore();

const getInputColor = computed(() => {
  return commandValues.some(
    (command) => cmdStore.getCommandLineInput.value.split(/\s+/)[0] === command
  )
    ? '93, 245, 166'
    : '190, 190, 190';
});

async function executeCommand() {
  const processedInput = destructureInput();

  if (JSON.stringify(processedInput) !== '[null,"",null]') {
    switch (
      Array.isArray(processedInput) ? processedInput[0] : processedInput
    ) {
      case Commands.JOIN:
        const exists = await groupService.checkIfGroupExists(processedInput[1]);

        if (exists) {
          await groupStore.joinMyselfToGroup(
            processedInput[1],
            authStore.getCurrentUser.nickname
          );
        } else if (processedInput[2]) {
          await groupStore.createNewGroup({
            name: processedInput[1],
            color: colorValues[Math.floor(Math.random() * colorValues.length)],
            isPrivate: processedInput[2] == Commands.PRIVATE,
          });
        } else {
          await groupStore.createNewGroup({
            name: processedInput[1],
            color: colorValues[Math.floor(Math.random() * colorValues.length)],
            isPrivate: false,
          });
        }

        await groupStore.userStoppedTyping(authStore.getCurrentUser.nickname);
        groupStore.changeActiveGroup(processedInput[1]);
        break;
      case Commands.INVITE:
        if (!groupStore.getActiveGroup) break;

        await groupStore.inviteUserToGroup(
          processedInput[1],
          authStore.getCurrentUser.id
        );
        break;
      case Commands.KICK:
        if (groupStore.getActiveGroup?.isPrivate) break;

        await groupStore.removeOtherUserFromGroup(
          processedInput[1],
          authStore.getCurrentUser.id
        );
        break;
      case Commands.CANCEL:
        if (!groupStore.getActiveGroup) break;

        await groupStore.removeMyselfFromGroup(authStore.getCurrentUser.id);
        break;
      case Commands.QUIT:
        if (groupStore.getActiveGroup?.ownerId !== authStore.getCurrentUser.id)
          break;

        await groupStore.removeMyselfFromGroup(authStore.getCurrentUser.id);
        break;
      case Commands.REVOKE:
        if (!groupStore.getActiveGroup?.isPrivate) break;

        await groupStore.removeOtherUserFromGroup(
          processedInput[1],
          authStore.getCurrentUser.id
        );
        break;
      case Commands.LIST:
        const name = Array.isArray(processedInput)
          ? processedInput[1]
          : groupStore.getActiveGroup?.name;

        if (
          !name ||
          !groupStore.getJoinedGroups.some((groupName) => groupName === name)
        )
          break;

        appStore.setGroupNameForModal(name);
        appStore.toggleGroupMembersModal();
        break;
      default:
        if (!groupStore.getActiveGroup) break;

        await groupStore.shareNewMessageInGroup(processedInput[1]);
    }
  }

  cmdStore.clearCommandLineInput();
}

function destructureInput(): [string, string, Commands] | string {
  let command: string = null;
  let name: string = null;
  let modifier: Commands = null;

  let text = cmdStore.commandLineInput.split(/\s+/);

  for (const cmd of commandValues) {
    if (text[0] !== cmd) continue;

    command = cmd;
    text.shift();
    break;
  }

  if (!command) return [command, text.join(' '), modifier];
  else if (text.length === 0) return command;

  switch (text.slice(-1)[0]) {
    case Commands.PRIVATE:
      modifier = Commands.PRIVATE;
      text.pop();
      break;
    case Commands.PUBLIC:
      modifier = Commands.PUBLIC;
      text.pop();
      break;
    default:
  }

  name = text.join(' ');

  return [command, name, modifier];
}

watch(cmdStore.getUserToAddress, () => {
  if (!cmdStore.getUserToAddress.value) return;

  cmdStore.commandLineInput = `${cmdStore.getCommandLineInput.value.trimEnd()} @${
    cmdStore.getUserToAddress.value
  }`;
  cmdStore.setUserToAddress(null);
});

watch(cmdStore.getCommandLineInput, () => {
  if (cmdStore.commandLineInput) {
    (async () =>
      await groupStore.userStartedTyping(
        cmdStore.commandLineInput,
        authStore.getCurrentUser.nickname
      ))();
  } else {
    (async () =>
      await groupStore.userStoppedTyping(authStore.getCurrentUser.nickname))();
  }
});
</script>

<style scoped lang="scss">
.width {
  width: auto;
}
</style>
