enum Statuses {
  OFFLINE = 'grey',
  ONLINE = 'green',
  DND = 'red',
}

export default Statuses;

export const statusValues = Object.values(Statuses);
export const statusKeys = Object.keys(Statuses);
