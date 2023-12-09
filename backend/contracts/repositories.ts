// here we are declaring our MessageRepository types for Repositories/MessageRepository
// container binding. See providers/AppProvider.ts for how we are binding the implementation

declare module '@ioc:Repositories/WsGroupRepository' {
  import type { GroupJSON } from "@ioc:Repositories/GroupRepository";

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

  export interface GroupUserJSON {
    id: number;
    nickname: string;
    color: string;
  }

  export interface IWsGroupRepository {
    getMessagesByGroupName(groupName: string, date: string): Promise<GroupMessageJSON[]>;
    createGroupMessage(groupName: string, userId: number, content: string): Promise<GroupMessageJSON>;
    getUsersByGroupName(groupName: string): Promise<GroupUserJSON[]>;
    joinUserToGroup(groupName: string, userName: string): Promise<{ groupJSON: GroupJSON, userJSON: GroupUserJSON }>;
    removeUserFromGroup(groupName: string, userId: number, authId: number): Promise<boolean>;
  }

  export const WsGroupRepository: IWsGroupRepository;
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
  }

  export const GroupRepository: IGroupRepository;
}
