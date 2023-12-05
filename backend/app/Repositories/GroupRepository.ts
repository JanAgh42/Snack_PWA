import type { IGroupRepository, GroupJSON } from "@ioc:Repositories/GroupRepository";

import Group from "App/Models/Group";
import User from "App/Models/User";

export default class GroupRepository implements IGroupRepository {
  public async createNewGroup(groupName: string, color: string, isPrivate: boolean, user: User): Promise<GroupJSON> {
    const group = await Group.create({ name: groupName, color, ownerId: user.id, isPrivate });

    await user.related('groups').attach([group.id]);

    return group.serialize() as GroupJSON;
  }

  public async joinGroup(groupName: string, user: User): Promise<GroupJSON> {
    const group = await Group.findByOrFail('name', groupName);

    await user.related('groups').attach([group.id]);

    return group.serialize() as GroupJSON;
  }
}
