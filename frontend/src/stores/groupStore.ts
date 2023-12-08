import { defineStore } from 'pinia';
import format from 'date-fns/format';
import { Guid } from 'js-guid';

import { reactive, computed } from 'vue';

import { GroupState, GroupData } from 'src/models/users/groupState';
import groupService from 'src/api/services/groupService';
import commonService from 'src/api/services/commonService';

import { Message } from 'src/models/users/message';
import Group from 'src/models/users/group';
import { GroupUser } from 'src/models/users/user';

export const useGroupStore = defineStore('groups', () => {
  const state: GroupState = reactive({
    isLoading: false,
    error: null,
    groups: [],
    groupMessages: {},
    typedMessages: {},
    groupUsers: {},
    activeGroup: null,
  });

  const getActiveGroup = computed(() => state.activeGroup);
  const getUserNamesFromActiveGroup = computed(() => {
    return state.groupUsers[state.activeGroup.name].map(
      (user) => user.nickname
    );
  });
  const getJoinedGroups = computed(() => Object.keys(state.groupMessages));
  const getTypedOfActiveGroup = computed(() =>
    state.activeGroup !== null
      ? state.typedMessages[state.activeGroup.name]
      : []
  );
  const getMessagesOfActiveGroup = computed(() =>
    state.activeGroup !== null
      ? state.groupMessages[state.activeGroup.name]
      : []
  );
  const getUsersOfActiveGroup = computed(() =>
    state.activeGroup !== null ? state.groupUsers[state.activeGroup.name] : []
  );

  function markLoadingStart(): void {
    state.isLoading = true;
    state.error = null;
  }

  function markLoadingSuccess(data: GroupData): void {
    state.isLoading = false;
    state.groupMessages[data.groupName] = data.groupMessages;
    state.groupUsers[data.groupName] = data.groupUsers;
  }

  function markLoadingEnd(): void {
    state.isLoading = false;
    state.error = null;
  }

  function markLoadingError(error: Error): void {
    state.isLoading = false;
    state.error = error;
  }

  function clearupGroupEntry(groupName: string): void {
    state.activeGroup = null;
    delete state.groupMessages[groupName];
    delete state.typedMessages[groupName];
    delete state.groupUsers[groupName];

    state.groups.splice(
      state.groups.findIndex((group) => group.name === groupName),
      1
    );
  }

  function changeActiveGroup(groupName?: string): void {
    state.activeGroup = groupName
      ? state.groups[
          state.groups.findIndex((group) => group.name === groupName)
        ]
      : null;
  }

  function insertNewMessage(groupName: string, message: Message): void {
    state.groupMessages[groupName].push(message);
  }

  function insertNewGroup(newGroup: Group): void {
    state.groups.unshift(newGroup);
  }

  function insertNewUser(groupName: string, groupUser: GroupUser): void {
    state.groupUsers[groupName].push(groupUser);
  }

  function insertLoadedMessages(groupName: string, messages: Message[]): void {
    state.groupMessages[groupName] = messages
      .toReversed()
      .concat(state.groupMessages[groupName]);
  }

  function removeUserFromGroup(userId: number, groupName: string): void {
    state.groupUsers[groupName].splice(
      state.groupUsers[groupName].findIndex((user) => user.id === userId),
      1
    );
  }

  function startedTyping(
    groupName: string,
    userName: string,
    typedMessage: string
  ): void {
    const userTypingExists = checkIfUserAlreadyTyped(groupName, userName);

    if (!userTypingExists) {
      state.typedMessages[groupName].push({
        id: Guid.newGuid().toString(),
        nickname: userName,
        content: typedMessage,
        createdAt: new Date().toString(),
      });
    } else {
      state.typedMessages[groupName].find(
        (typed) => typed.nickname === userName
      ).content = typedMessage;
    }
  }

  function stoppedTyping(groupName: string, userName: string): void {
    const userTypingExists = checkIfUserAlreadyTyped(groupName, userName);

    if (!userTypingExists) return;

    state.typedMessages[groupName].splice(
      state.typedMessages[groupName].findIndex(
        (typed) => typed.nickname === userName
      ),
      1
    );
  }

  function checkIfUserAlreadyTyped(
    groupName: string,
    userName: string
  ): boolean {
    const groupTypingsExist = groupName in state.typedMessages;
    const userTypingExists = groupTypingsExist
      ? state.typedMessages[groupName].some(
          (typed) => typed.nickname === userName
        )
      : false;

    if (!groupTypingsExist) state.typedMessages[groupName] = [];

    return userTypingExists;
  }

  async function inviteUserToGroup(
    nickname: string,
    authId: number
  ): Promise<void> {
    try {
      const groupName = state.activeGroup.name;
      const isPrivate = state.activeGroup.isPrivate;
      const ownerId = state.activeGroup.ownerId;

      if (isPrivate && ownerId !== authId) return;

      await commonService
        .getCommonSocket()
        .inviteToJoinGroup(groupName, nickname);
    } catch (error: any) {
      markLoadingError(error as Error);
      throw error;
    }
  }

  async function joinMyselfToGroup(
    groupName: string,
    nickname: string
  ): Promise<void> {
    try {
      markLoadingStart();
      const isPrivate = await groupService.checkIfGroupIsPrivate(groupName);
      console.log(isPrivate);

      if (isPrivate) return;

      await subscribeToGroupSocket(groupName);

      const group = await groupService
        .getGroupSocketByName(groupName)
        ?.joinUserToGroup(nickname);

      insertNewGroup(group);
    } catch (error: any) {
      markLoadingError(error as Error);
      throw error;
    }
  }

  async function invitedToJoinGroup(
    group: Group,
    invitedByAdmin: boolean
  ): Promise<void> {
    try {
      if (!invitedByAdmin && group.isPrivate) return;

      await subscribeToGroupSocket(group.name);

      insertNewGroup(group);
      changeActiveGroup(group.name);
    } catch (error: any) {
      markLoadingError(error as Error);
      throw error;
    }
  }

  async function removeOtherUserFromGroup(userName: string, authId: number) {
    try {
      const groupName = state.activeGroup.name;
      const isPrivate = state.activeGroup.isPrivate;
      const ownerId = state.activeGroup.ownerId;

      if (isPrivate && ownerId !== authId) return;

      const userId = state.groupUsers[groupName].find(
        (user) => user.nickname === userName
      ).id;

      await groupService
        .getGroupSocketByName(groupName)
        ?.removeUserFromGroup(userId);

      removeUserFromGroup(userId, groupName);
    } catch (error: any) {
      markLoadingError(error as Error);
      throw error;
    }
  }

  async function removeMyselfFromGroup(userId: number): Promise<void> {
    try {
      markLoadingStart();
      const groupName = state.activeGroup.name;

      await groupService
        .getGroupSocketByName(groupName)
        ?.removeUserFromGroup(userId);

      await unsubscribeFromGroupSocket(groupName);

      markLoadingEnd();
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
      const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      const groupSocket = groupService.subscribeToGroupSocket(groupName);

      const loadedMessages = await groupSocket.loadGroupMessages(currentDate);
      const loadedUsers = await groupSocket.loadGroupUsers();

      markLoadingSuccess({
        groupName,
        groupMessages: loadedMessages.toReversed(),
        groupUsers: loadedUsers,
      });
    } catch (error: any) {
      markLoadingError(error as Error);
      throw error;
    }
  }

  function unsubscribeFromGroupSocket(groupName: string): void {
    groupService.unsubscribeFromGroupSocket(groupName);
    clearupGroupEntry(groupName);
  }

  function unsubscribeFromAllGroupSockets(): void {
    getJoinedGroups.value.forEach((groupName: string) => {
      groupService.unsubscribeFromGroupSocket(groupName);
      clearupGroupEntry(groupName);
    });
  }

  async function shareNewMessageInGroup(messageContent: string): Promise<void> {
    const groupName = state.activeGroup.name;

    const savedMessage = await groupService
      .getGroupSocketByName(groupName)
      ?.addGroupMessage(messageContent);

    insertNewMessage(groupName, savedMessage);
  }

  async function loadAnotherGroupOfMessages(): Promise<void> {
    if (!state.activeGroup) return;

    const groupName = state.activeGroup.name;
    const groupSocket = groupService.getGroupSocketByName(groupName);

    if (!state.groupMessages[groupName][0]) return;

    const currentDate = format(
      new Date(state.groupMessages[groupName][0].createdAt),
      'yyyy-MM-dd HH:mm:ss'
    );

    const newMessages = await groupSocket.loadGroupMessages(currentDate);

    insertLoadedMessages(groupName, newMessages);
  }

  async function userStartedTyping(
    typedMessage: string,
    userName: string
  ): Promise<void> {
    if (!state.activeGroup) return;

    const groupName = state.activeGroup.name;
    const groupSocket = groupService.getGroupSocketByName(groupName);

    if (!groupSocket) return;

    await groupSocket.userStartedTyping(typedMessage, userName);
  }

  async function userStoppedTyping(userName: string): Promise<void> {
    if (!state.activeGroup) return;

    const groupName = state.activeGroup.name;
    const groupSocket = groupService.getGroupSocketByName(groupName);

    console.log(groupName);

    if (!groupSocket) return;

    await groupSocket.userStoppedTyping(userName);
  }

  return {
    state,
    getActiveGroup,
    getJoinedGroups,
    getMessagesOfActiveGroup,
    getUsersOfActiveGroup,
    getUserNamesFromActiveGroup,
    getTypedOfActiveGroup,
    startedTyping,
    stoppedTyping,
    changeActiveGroup,
    insertNewMessage,
    insertNewGroup,
    insertNewUser,
    removeUserFromGroup,
    inviteUserToGroup,
    invitedToJoinGroup,
    joinMyselfToGroup,
    removeMyselfFromGroup,
    removeOtherUserFromGroup,
    createNewGroup,
    subscribeToGroupSocket,
    unsubscribeFromGroupSocket,
    unsubscribeFromAllGroupSockets,
    shareNewMessageInGroup,
    loadAnotherGroupOfMessages,
    userStartedTyping,
    userStoppedTyping,
  };
});
