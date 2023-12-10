import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'

import type { IWsGroupRepository } from '@ioc:Repositories/WsGroupRepository'
import { inject } from '@adonisjs/core/build/standalone'

@inject(['Repositories/WsGroupRepository'])
export default class WsCommonController {
  constructor (private wsGroupRepository: IWsGroupRepository) {}

  public async userIsOnline({ auth, socket }: WsContextContract): Promise<void> {
    auth.user!.status = 'ONLINE';
    await auth.user!.save();

    socket.join(`user:${auth.user!.id}`);
  }

  public async userIsOffline({ auth, socket }: WsContextContract): Promise<void> {
    auth.user!.status = 'OFFLINE';
    await auth.user!.save();

    socket.leave(`user:${auth.user!.id}`);
  }

  public async inviteToJoinGroup({ auth, socket }: WsContextContract, groupName: string, userName: string): Promise<void> {
    const JSONs = await this.wsGroupRepository.joinUserToGroup(groupName, userName);

    socket.nsp.except(`user:${JSONs.userJSON.id}`).emit('newGroupUser', groupName, JSONs.userJSON);
    socket.to(`user:${JSONs.userJSON.id}`).emit('invitedToJoinGroup', JSONs.groupJSON, auth.user!.id === JSONs.groupJSON.ownerId ? true : false);
  }
}
