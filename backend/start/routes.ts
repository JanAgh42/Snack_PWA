/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { hello: 'world' };
})

Route.group(() => {
  Route.post('register-user', 'AuthenticationController.registerUser');
  Route.post('login-user', 'AuthenticationController.loginUser');
  Route.post('logout-user', 'AuthenticationController.logoutUser').middleware('authentication');
}).prefix('auth');

Route.group(() => {
  Route.get('get-current-user', 'UserController.getCurrentUser').middleware('authentication');
  Route.patch('edit-user', 'UserController.editUserData').middleware('authentication');
}).prefix('users');

Route.group(() => {
  Route.post('create-group', 'GroupController.createNewGroup').middleware('authentication');
  Route.get(':name/exists', 'GroupController.checkIfGroupExists').middleware('authentication');
  Route.get(':name/type', 'GroupController.checkIfGroupIsPrivate').middleware('authentication');
}).prefix('groupshttp');
