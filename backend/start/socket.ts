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
  .connected('WsCommonController.userIsOnline')
  .disconnecting('WsCommonController.userIsOffline')
  .on('inviteToJoinGroup', 'WsCommonController.inviteToJoinGroup')

// this is dynamic namespace, in controller methods we can use params.name
Ws.namespace('groups/:name')
  .connected('WsUserStatusController.notifyAboutOnlineStatus')
  .disconnecting('WsUserStatusController.notifyAboutOfflineStatus')
  .on('userChangedStatus', 'WsUserStatusController.notifyAboutAnyStatus')
  .on('loadGroupMessages', 'WsGroupController.loadGroupMessages')
  .on('addGroupMessage', 'WsGroupController.addGroupMessage')
  .on('loadGroupUsers', 'WsGroupController.loadGroupUsers')
  .on('joinUserToGroup', 'WsGroupController.joinUserToGroup')
  .on('removeUserFromGroup', 'WsGroupController.removeUserFromGroup')
  .on('userStartedTyping', 'WsGroupController.userStartedTyping')
  .on('userStoppedTyping', 'WsGroupController.userStoppedTyping')
