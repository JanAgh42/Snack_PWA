import type { IGroupMessageRepository, GroupMessageJSON } from '@ioc:Repositories/GroupMessageRepository';

import Group from 'App/Models/Group';

export default class GroupMessageRepository implements IGroupMessageRepository {
  public async getMessagesByGroupName(groupName: string): Promise<GroupMessageJSON[]> {
    const group = await Group
      .query()
      .where('name', groupName)
      .preload('groupMessages', (messagesQuery) => messagesQuery.preload('author'))
      .firstOrFail();

    return group.groupMessages.map((message) => message.serialize() as GroupMessageJSON);
  }

  public async createGroupMessage(groupName: string, userId: number, content: string): Promise<GroupMessageJSON> {
    const group = await Group.findByOrFail('name', groupName);
    const message = await group.related('groupMessages').create({ userId: userId, textContent: content });
    await message.load('author');

    return message.serialize() as GroupMessageJSON;
  }
}
