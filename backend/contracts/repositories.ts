// here we are declaring our MessageRepository types for Repositories/MessageRepository
// container binding. See providers/AppProvider.ts for how we are binding the implementation
declare module '@ioc:Repositories/GroupMessageRepository' {
  export interface GroupMessageJSON {
    id: number,
    userId: number
    content: string
    groupId: number,
    createdAt: string,
    author: {
      id: number,
      name: string,
      nickname: string,
      email: string,
      color: string
    }
  }

  export interface IGroupMessageRepository {
    getMessagesByGroupName(groupName: string): Promise<GroupMessageJSON[]>
    createGroupMessage(channelName: string, userId: number, content: string): Promise<GroupMessageJSON>
  }

  const GroupMessageRepository: IGroupMessageRepository
  export default GroupMessageRepository
}
