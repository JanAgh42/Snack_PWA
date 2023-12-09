/*
|--------------------------------------------------------------------------
| Websocket events
|--------------------------------------------------------------------------
|
| This file is dedicated for defining websocket namespaces and event handlers.
|
*/

import Ws from '@ioc:Ruby184/Socket.IO/Ws'

Ws.namespace('common')
  .connected(({ socket, auth }) => {
    socket.join(`user:${auth.user!.id}`);
  })
  // .disconnected(({ socket, auth }) => {
  //   socket.leave(`user:${auth.user!.id}`)
  // })
  .on('inviteToJoinGroup', 'WsGroupController.inviteToJoinGroup')

// this is dynamic namespace, in controller methods we can use params.name
Ws.namespace('groups/:name')
  // .middleware('channel') // check if user can join given channel
  .on('loadGroupMessages', 'WsGroupController.loadGroupMessages')
  .on('addGroupMessage', 'WsGroupController.addGroupMessage')
  .on('loadGroupUsers', 'WsGroupController.loadGroupUsers')
  .on('joinUserToGroup', 'WsGroupController.joinUserToGroup')
  .on('removeUserFromGroup', 'WsGroupController.removeUserFromGroup')
  .on('userStartedTyping', 'WsGroupController.userStartedTyping')
  .on('userStoppedTyping', 'WsGroupController.userStoppedTyping')
