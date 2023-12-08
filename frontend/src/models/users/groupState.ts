import { Message, TypedMessage } from './message';
import Group from './group';
import { GroupUser } from './user';

export interface GroupData {
  groupName: string;
  groupMessages: Message[];
  groupUsers: GroupUser[];
}

export interface GroupState {
  isLoading: boolean;
  error: Error | null;
  groups: Group[];
  groupMessages: { [groupName: string]: Message[] };
  typedMessages: { [groupName: string]: TypedMessage[] };
  groupUsers: { [groupname: string]: GroupUser[] };
  activeGroup: Group | null;
}
