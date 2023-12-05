export default interface Group {
  id?: number;
  name: string;
  color: string;
  isPrivate: boolean;
  ownerId?: number;
}
