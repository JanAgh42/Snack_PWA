import Message from 'src/models/users/message';
import { BootParams, SocketManager } from '../socketManager';

import { useGroupStore } from 'src/stores/groupStore';

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class GroupSocketManager extends SocketManager {
  public subscribe({ store }: BootParams): void {
    const groupName = this.namespace.split('/').pop();

    const groupStore = useGroupStore(store);

    this.socket.on('newMessage', (newMessage: Message) => {
      groupStore.insertNewMessage(groupName, newMessage);
    });
  }

  public addGroupMessage(message: string): Promise<Message> {
    return this.emitAsync<Message>('addGroupMessage', message);
  }

  public loadGroupMessages(): Promise<Message[]> {
    return this.emitAsync<Message[]>('loadGroupMessages');
  }
}

export default GroupSocketManager;
