import Message from './message';
import Group from './group';

export interface GroupMessages {
  groupName: string;
  groupMessages: Message[];
}

export interface GroupState {
  isLoading: boolean;
  error: Error | null;
  groups: Group[];
  groupMessages: { [groupName: string]: Message[] };
  activeGroup: Group | null;
}
