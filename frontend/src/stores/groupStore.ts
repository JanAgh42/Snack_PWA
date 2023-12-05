import { defineStore } from 'pinia';

import { reactive, computed } from 'vue';

import { GroupState, GroupMessages } from 'src/models/users/groupState';
import groupService from 'src/api/services/groupService';

import Message from 'src/models/users/message';
import Group from 'src/models/users/group';

export const useGroupStore = defineStore('groups', () => {
  const state: GroupState = reactive({
    isLoading: false,
    error: null,
    groups: [],
    groupMessages: {},
    activeGroup: null,
  });

  const getChosenGroup = computed(() => state.activeGroup);
  const getJoinedGroups = computed(() => Object.keys(state.groupMessages));
  const getMessagesOfActiveGroup = computed(() =>
    state.activeGroup !== null
      ? state.groupMessages[state.activeGroup.name]
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
    state.activeGroup = null;
    delete state.groupMessages[groupName];
    state.groups.splice(
      state.groups.findIndex((group) => group.name === groupName),
      1
    );
  }

  function changeActiveGroup(groupName: string): void {
    state.activeGroup =
      state.groups[state.groups.findIndex((group) => group.name === groupName)];
  }

  function insertNewMessage(groupName: string, message: Message): void {
    state.groupMessages[groupName].push(message);
  }

  function insertNewGroup(newGroup: Group): void {
    state.groups.push(newGroup);
  }

  async function joinGroup(groupName: string): Promise<void> {
    try {
      markLoadingStart();

      const group = await groupService.joinGroup(groupName);

      insertNewGroup(group);

      await subscribeToGroupSocket(groupName);
    } catch (error: any) {
      markLoadingError(error as Error);
      throw error;
    }
  }

  async function createNewGroup(group: Group): Promise<void> {
    try {
      markLoadingStart();

      const newGroup = await groupService.createNewGroup(group);

      insertNewGroup(newGroup);

      await subscribeToGroupSocket(newGroup.name);
    } catch (error: any) {
      markLoadingError(error as Error);
      throw error;
    }
  }

  async function subscribeToGroupSocket(groupName: string): Promise<void> {
    try {
      markLoadingStart();

      const loadedMessages = await groupService
        .subscribeToGroupSocket(groupName)
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

  async function unsubscribeFromGroupSocket(groupName: string): Promise<void> {
    groupService.unsubscribeFromGroupSocket(groupName);
    clearupGroupEntry(groupName);
  }

  async function unsubscribeFromAllGroupSockets(): Promise<void> {
    getJoinedGroups.value.forEach((groupName: string) => {
      groupService.unsubscribeFromGroupSocket(groupName);
      clearupGroupEntry(groupName);
    });
  }

  async function shareNewMessageInGroup(
    groupName: string,
    messageContent: string
  ): Promise<void> {
    const savedMessage = await groupService
      .getGroupSocketByName(groupName)
      ?.addGroupMessage(messageContent);

    insertNewMessage(groupName, savedMessage);
  }

  return {
    state,
    getChosenGroup,
    getJoinedGroups,
    getMessagesOfActiveGroup,
    changeActiveGroup,
    insertNewMessage,
    insertNewGroup,
    joinGroup,
    createNewGroup,
    subscribeToGroupSocket,
    unsubscribeFromGroupSocket,
    unsubscribeFromAllGroupSockets,
    shareNewMessageInGroup,
  };
});
