import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import { DateTime } from 'luxon';

import Group from 'App/Models/Group';

export default class WsUserStatusController {
  public async notifyAboutOnlineStatus({ auth, params, socket }: WsContextContract): Promise<void> {
    const group = await Group.findByOrFail('name', params.name);

    if(group.createdAt < DateTime.local().minus({ days: 30 })) {
      await group.delete();
      socket.broadcast.emit('groupTerminated');
      return;
    }

    socket.join(params.name);
    socket.nsp.to(params.name).emit('changedStatus', auth.user!.nickname, auth.user!.status);
  }

  public async notifyAboutOfflineStatus({ auth, params, socket }: WsContextContract): Promise<void> {
    socket.nsp.to(params.name).emit('changedStatus', auth.user!.nickname, 'OFFLINE');
    socket.leave(params.name);
  }

  public async notifyAboutAnyStatus({ auth, socket }: WsContextContract, userName: string, status: string): Promise<void> {
    if (auth.user!.status !== status) {
      auth.user!.status = status;
      await auth.user!.save();
    }

    socket.nsp.emit('changedStatus', userName, status);
  }
}
