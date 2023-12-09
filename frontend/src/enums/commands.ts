enum Commands {
  JOIN = '/join',
  INVITE = '/invite',
  REVOKE = '/revoke',
  KICK = '/kick',
  QUIT = '/quit',
  CANCEL = '/cancel',
  LIST = '/list',
  PRIVATE = '[private]',
  PUBLIC = '[public]',
}

export default Commands;

export const commandValues = Object.values(Commands);
