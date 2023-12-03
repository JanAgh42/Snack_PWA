import { defineStore } from 'pinia';

import { reactive, computed } from 'vue';

import { GroupState, GroupMessages } from 'src/models/users/groupState';
import groupService from 'src/api/services/groupService';

import Message from 'src/models/users/message';

export const useGroupStore = defineStore('groups', () => {
  const state: GroupState = reactive({
    isLoading: false,
    error: null,
    groupMessages: {},
    activeGroupName: null,
  });

  const getChosenGroup = computed(() => state.activeGroupName);
  const getJoinedGroups = computed(() => Object.keys(state.groupMessages));
  const getMessagesOfActiveGroup = computed(() =>
    state.activeGroupName !== null
      ? state.groupMessages[state.activeGroupName]
      : []
  );

  function markLoadingStart(): void {
    state.isLoading = true;
    state.error = null;
  }

  function markLoadingSuccess(entry: GroupMessages): void {
    state.isLoading = false;
    state.groupMessages[entry.groupName] = entry.groupMessages;
  }

  function markLoadingError(error: Error): void {
    state.isLoading = false;
    state.error = error;
  }

  function clearupGroupEntry(groupName: string): void {
    state.activeGroupName = null;
    delete state.groupMessages[groupName];
  }

  function changeActiveGroup(groupName: string): void {
    state.activeGroupName = groupName;
  }

  function insertNewMessage(groupName: string, message: Message): void {
    state.groupMessages[groupName].push(message);
  }

  async function joinGroup(groupName: string): Promise<void> {
    try {
      markLoadingStart();

      const loadedMessages = await groupService
        .joinGroup(groupName)
        .loadGroupMessages();

      markLoadingSuccess({
        groupName,
        groupMessages: loadedMessages,
      });
    } catch (error: any) {
      markLoadingError(error as Error);
      throw error;
    }
  }

  async function leaveGroup(groupName: string): Promise<void> {
    groupService.leaveGroup(groupName);
    clearupGroupEntry(groupName);
  }

  async function leaveAllGroups(): Promise<void> {
    getJoinedGroups.value.forEach((groupName: string) => {
      groupService.leaveGroup(groupName);
      clearupGroupEntry(groupName);
    });
  }

  async function shareNewMessageInGroup(
    groupName: string,
    messageContent: string
  ): Promise<void> {
    const savedMessage = await groupService
      .getGroupByName(groupName)
      ?.addGroupMessage(messageContent);

    insertNewMessage(groupName, savedMessage);
  }

  return {
    getChosenGroup,
    getJoinedGroups,
    getMessagesOfActiveGroup,
    changeActiveGroup,
    insertNewMessage,
    joinGroup,
    leaveGroup,
    leaveAllGroups,
    shareNewMessageInGroup,
  };
});
