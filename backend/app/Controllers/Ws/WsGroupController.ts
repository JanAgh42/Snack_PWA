import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import type { GroupMessageJSON, GroupUserJSON, IWsGroupRepository } from '@ioc:Repositories/WsGroupRepository'
import type { GroupJSON } from '@ioc:Repositories/GroupRepository';
import { inject } from '@adonisjs/core/build/standalone'

@inject(['Repositories/WsGroupRepository'])
export default class WsGroupController {
  constructor (private wsGroupRepository: IWsGroupRepository) {}

  public async loadGroupMessages({ params }: WsContextContract, date: string): Promise<GroupMessageJSON[]> {
    return this.wsGroupRepository.getMessagesByGroupName(params.name, date);
  }

  public async addGroupMessage({ params, socket, auth }: WsContextContract, content: string): Promise<GroupMessageJSON> {
    const message = await this.wsGroupRepository.createGroupMessage(params.name, auth.user!.id, content);

    socket.broadcast.emit('newMessage', message);

    return message;
  }

  public async loadGroupUsers({ params }: WsContextContract): Promise<GroupUserJSON[]> {
    return this.wsGroupRepository.getUsersByGroupName(params.name);
  }

  public async joinUserToGroup({ params, socket }: WsContextContract, userName: string): Promise<GroupJSON> {
    const JSONs = await this.wsGroupRepository.joinUserToGroup(params.name, userName);

    socket.nsp.emit('newGroupUser', JSONs.userJSON);

    return JSONs.groupJSON;
  }

  public async removeUserFromGroup({ params, auth, socket }: WsContextContract, userId: number): Promise<number> {
    const ownerDeleted = await this.wsGroupRepository.removeUserFromGroup(params.name, userId, auth.user!.id);

    if (ownerDeleted) {
      socket.broadcast.emit('groupTerminated');
    }

    socket.broadcast.emit('userLeftGroup', userId);

    return userId;
  }

  public async inviteToJoinGroup({ auth, socket }: WsContextContract, groupName: string, userName: string): Promise<void> {
    const JSONs = await this.wsGroupRepository.joinUserToGroup(groupName, userName);

    socket.nsp.except(`user:${JSONs.userJSON.id}`).emit('newGroupUser', groupName, JSONs.userJSON);
    socket.to(`user:${JSONs.userJSON.id}`).emit('invitedToJoinGroup', JSONs.groupJSON, auth.user!.id === JSONs.groupJSON.ownerId ? true : false);
  }

  public async userStartedTyping({ socket }: WsContextContract, typedMessage: string, userName: string): Promise<void> {
    socket.broadcast.emit('startedTyping', typedMessage, userName);
  }

  public async userStoppedTyping({ socket }: WsContextContract, userName: string): Promise<void> {
    socket.broadcast.emit('stoppedTyping', userName);
  }
}
