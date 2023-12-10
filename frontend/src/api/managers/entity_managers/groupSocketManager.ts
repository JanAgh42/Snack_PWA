import { Message } from 'src/models/users/message';
import Group from 'src/models/users/group';
import { GroupUser } from 'src/models/users/user';

import { BootParams, SocketManager } from '../socketManager';

import { useGroupStore } from 'src/stores/groupStore';
import { useAuthenticationStore } from 'src/stores/authenticationStore';

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class GroupSocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    const groupName = this.namespace.split('/').pop();

    const groupStore = useGroupStore(store);
    const authStore = useAuthenticationStore(store);

    this.socket.on('newMessage', (newMessage: Message) => {
      groupStore.insertNewMessage(groupName, newMessage);
    });

    this.socket.on('newGroupUser', (newUser: GroupUser) => {
      groupStore.insertNewUser(groupName, newUser);
    });

    this.socket.on('userLeftGroup', (userId: number) => {
      if (authStore.getCurrentUser.id != userId) {
        groupStore.removeUserFromGroup(userId, groupName);
      } else {
        groupStore.unsubscribeFromGroupSocket(groupName);
      }
    });

    this.socket.on('groupTerminated', () => {
      groupStore.unsubscribeFromGroupSocket(groupName);
    });

    this.socket.on(
      'startedTyping',
      (typedMessage: string, userName: string) => {
        groupStore.startedTyping(groupName, userName, typedMessage);
      }
    );

    this.socket.on('stoppedTyping', (userName: string) => {
      groupStore.stoppedTyping(groupName, userName);
    });

    this.socket.on('changedStatus', (userName: string, status: string) => {
      groupStore.changedStatus(groupName, userName, status);
    });
  }

  public async addGroupMessage(message: string): Promise<Message> {
    return this.emitAsync<Message>('addGroupMessage', message);
  }

  public async loadGroupMessages(date: string): Promise<Message[]> {
    return this.emitAsync<Message[]>('loadGroupMessages', date);
  }

  public async loadGroupUsers(): Promise<GroupUser[]> {
    return this.emitAsync<GroupUser[]>('loadGroupUsers');
  }

  public async joinUserToGroup(userName: string): Promise<Group> {
    return this.emitAsync<Group>('joinUserToGroup', userName);
  }

  public async removeUserFromGroup(userId: number): Promise<number> {
    return this.emitAsync<number>('removeUserFromGroup', userId);
  }

  public async userStartedTyping(
    typedMessage: string,
    userName: string
  ): Promise<void> {
    this.emitAsync<void>('userStartedTyping', typedMessage, userName);
  }

  public async userStoppedTyping(userName: string): Promise<void> {
    this.emitAsync<void>('userStoppedTyping', userName);
  }

  public async userChangedStatus(
    userName: string,
    status: string
  ): Promise<void> {
    this.emitAsync<void>('userChangedStatus', userName, status);
  }
}

export default GroupSocketManager;
