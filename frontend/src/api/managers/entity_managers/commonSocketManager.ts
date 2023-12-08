import { BootParams, SocketManager } from '../socketManager';

import Group from 'src/models/users/group';
import { GroupUser } from 'src/models/users/user';

import { useGroupStore } from 'src/stores/groupStore';

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class CommonSocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    const groupStore = useGroupStore(store);

    this.socket.on(
      'invitedToJoinGroup',
      (group: Group, invitedByAdmin: boolean) => {
        (async () => {
          await groupStore.invitedToJoinGroup(group, invitedByAdmin);
        })();
      }
    );

    this.socket.on('newGroupUser', (groupName: string, newUser: GroupUser) => {
      groupStore.insertNewUser(groupName, newUser);
    });
  }

  public async inviteToJoinGroup(
    groupName: string,
    userName: string
  ): Promise<void> {
    this.emitAsync<void>('inviteToJoinGroup', groupName, userName);
  }
}

export default CommonSocketManager;
