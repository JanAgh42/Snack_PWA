import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import type { IGroupMessageRepository } from '@ioc:Repositories/GroupMessageRepository'
import { inject } from '@adonisjs/core/build/standalone'

// inject repository from container to controller constructor
// we do so because we can extract database specific storage to another class
// and also to prevent big controller methods doing everything
// controler method just gets data (validates it) and calls repository
// also we can then test standalone repository without controller
// implementation is bind into container inside providers/AppProvider.ts
@inject(['Repositories/MessageRepository'])
export default class MessageController {
  constructor (private messageRepository: IGroupMessageRepository) {}

  public async loadGroupMessages({ params }: WsContextContract) {
    return this.messageRepository.getMessagesByGroupName(params.name)
  }

  public async addGroupMessage({ params, socket, auth }: WsContextContract, content: string) {
    const message = await this.messageRepository.createGroupMessage(params.name, auth.user!.id, content)
    // broadcast message to other users in channel
    socket.broadcast.emit('newMessage', message)
    // return message to sender
    return message
  }
}
