import type { IWsGroupRepository, GroupMessageJSON, GroupUserJSON } from '@ioc:Repositories/WsGroupRepository';
import { GroupJSON } from '@ioc:Repositories/GroupRepository';

import Group from 'App/Models/Group';
import User from 'App/Models/User';
import GroupMessage from 'App/Models/GroupMessage';

export default class WsGroupRepository implements IWsGroupRepository {
  public async getMessagesByGroupName(groupName: string, date: string): Promise<GroupMessageJSON[]> {
    const group = await Group.findByOrFail('name', groupName);

    const messages = await GroupMessage
      .query()
      .where('group_id', group.id)
      .where('created_at', '<', date)
      .orderBy('created_at', 'desc')
      .limit(20).preload('author');

    return messages.map((message) => message.serialize() as GroupMessageJSON);
  }

  public async createGroupMessage(groupName: string, userId: number, content: string): Promise<GroupMessageJSON> {
    const group = await Group.findByOrFail('name', groupName);
    const message = await group.related('groupMessages').create({ userId: userId, textContent: content });
    await message.load('author');

    return message.serialize() as GroupMessageJSON;
  }

  public async getUsersByGroupName(groupName: string): Promise<GroupUserJSON[]> {
    const group = await Group
      .query()
      .where('name', groupName)
      .preload('users')
      .firstOrFail();

    return group.users.map((user) => user.serialize() as GroupUserJSON);
  }

  public async joinUserToGroup(groupName: string, userName: string): Promise<{ groupJSON: GroupJSON, userJSON: GroupUserJSON }> {
    const group = await Group.findByOrFail('name', groupName);
    const user = await User.findByOrFail('nickname', userName);

    await user.related('groups').attach([group.id]);

    return {
      groupJSON: group.serialize() as GroupJSON,
      userJSON: user.serialize() as GroupUserJSON
    };
  }

  public async removeUserFromGroup(groupName: string, userId: number, authId: number): Promise<boolean> {
    const group = await Group.findByOrFail('name', groupName);
    const user = await User.findByOrFail('id', userId);

    if (authId === userId && userId === group.ownerId) {    //owner deletes himself from his group
      await group.delete();
      return true;
    }

    await user.related('groups').detach([group.id]);

    return false;
  }
}
