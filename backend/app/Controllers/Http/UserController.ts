import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import User from 'App/Models/User';

export default class AuthenticationController {
  public async getCurrentUser({ auth }: HttpContextContract): Promise<User | undefined> {
    await auth.user!.load('groups');
    return auth.user;
  }

  public async editUserData({ auth, request }: HttpContextContract): Promise<boolean> {
    const name = request.input('userName').trim();

    if (name.length <= 0 || !(/[a-zA-Z][a-zA-Z ]+/.test(name))) return false;

    auth.user!.name = name;
    auth.user!.save();
    return true;
  }
}
