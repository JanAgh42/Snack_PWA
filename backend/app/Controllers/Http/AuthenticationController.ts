import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth';

import User from 'App/Models/User';

import RegisterValidator from 'App/Validators/RegisterValidator';

export default class AuthenticationController {
  public async registerUser({ request }: HttpContextContract): Promise<User> {
    const data = await request.validate(RegisterValidator);
    const user = await User.create(data);

    return user;
  }

  public async loginUser({ auth, request }: HttpContextContract): Promise<OpaqueTokenContract<User>> {
    const email = request.input('email');
    const password = request.input('password');
    const rememberMe = request.input('rememberMe');

    return auth.use('api').attempt(email, password, rememberMe);
  }

  public async logoutUser({ auth }: HttpContextContract): Promise<void> {
    return auth.use('api').logout();
  }
}
