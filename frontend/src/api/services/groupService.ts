import Group from 'src/models/users/group';
import GroupSocketManager from '../managers/entity_managers/groupSocketManager';
import { api } from 'src/boot/axios';

class GroupService {
  private groups: Map<string, GroupSocketManager> = new Map();

  public subscribeToGroupSocket(groupName: string): GroupSocketManager {
    if (this.groups.has(groupName)) {
      throw new Error(`User is already subscribed to group "${groupName}"`);
    }

    // connect to given channel namespace
    const group = new GroupSocketManager(`/groups/${groupName}`);
    this.groups.set(groupName, group);

    return group;
  }

  public unsubscribeFromGroupSocket(groupName: string): boolean {
    const group = this.groups.get(groupName);

    if (!group) return false;

    // disconnect namespace and remove references to socket
    group.destroy();
    return this.groups.delete(groupName);
  }

  public getGroupSocketByName(
    groupName: string
  ): GroupSocketManager | undefined {
    return this.groups.get(groupName);
  }

  public async createNewGroup(group: Group) {
    return (await api.post<Group>('groupshttp/create-group', group)).data;
  }

  public async checkIfGroupExists(groupName: string) {
    return (await api.get<boolean>(`groupshttp/${groupName}/exists`)).data;
  }

  public async checkIfGroupIsPrivate(groupName: string) {
    return (await api.get<boolean>(`groupshttp/${groupName}/type`)).data;
  }
}

export default new GroupService();
