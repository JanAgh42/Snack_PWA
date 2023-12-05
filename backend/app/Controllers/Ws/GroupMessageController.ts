import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import type { GroupMessageJSON, IGroupMessageRepository } from '@ioc:Repositories/GroupMessageRepository'
import { inject } from '@adonisjs/core/build/standalone'

@inject(['Repositories/GroupMessageRepository'])
export default class GroupMessageController {
  constructor (private groupMessageRepository: IGroupMessageRepository) {}

  public async loadGroupMessages({ params }: WsContextContract): Promise<GroupMessageJSON[]> {
    return this.groupMessageRepository.getMessagesByGroupName(params.name);
  }

  public async addGroupMessage({ params, socket, auth }: WsContextContract, content: string): Promise<GroupMessageJSON> {
    const message = await this.groupMessageRepository.createGroupMessage(params.name, auth.user!.id, content);

    socket.broadcast.emit('newMessage', message);

    return message;
  }
}
