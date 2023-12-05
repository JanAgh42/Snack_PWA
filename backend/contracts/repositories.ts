// here we are declaring our MessageRepository types for Repositories/MessageRepository
// container binding. See providers/AppProvider.ts for how we are binding the implementation

declare module '@ioc:Repositories/GroupMessageRepository' {
  export interface GroupMessageJSON {
    id: number;
    userId: number;
    content: string;
    groupId: number;
    createdAt: string;
    author: {
      id: number;
      name: string;
      nickname: string;
      email: string;
      color: string;
    };
  }

  export interface IGroupMessageRepository {
    getMessagesByGroupName(groupName: string): Promise<GroupMessageJSON[]>;
    createGroupMessage(groupName: string, userId: number, content: string): Promise<GroupMessageJSON>;
  }

  export const GroupMessageRepository: IGroupMessageRepository;
}

declare module '@ioc:Repositories/GroupRepository' {
  import User from "App/Models/User";

  export interface GroupJSON {
    id: number;
    name: number;
    color: string;
    ownerId: number;
    isPrivate: boolean;
  }

  export interface IGroupRepository {
    createNewGroup(groupName: string, color: string, isPrivate: boolean, user: User): Promise<GroupJSON>;
    joinGroup(groupName: string, user: User): Promise<GroupJSON>;
  }

  export const GroupRepository: IGroupRepository;
}
