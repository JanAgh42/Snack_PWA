import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Group from 'App/Models/Group'

import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthenticationController {
  async registerUser({ request }: HttpContextContract) {
    // if invalid, exception
    const data = await request.validate(RegisterValidator)
    const user = await User.create(data)
    // join user to general channel
    const general = await Group.findByOrFail('name', 'General')
    await user.related('groups').attach([general.id])

    return user
  }

  async loginUser({ auth, request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    return auth.use('api').attempt(email, password)
  }

  async logoutUser({ auth }: HttpContextContract) {
    return auth.use('api').logout()
  }

  async getCurrentUser({ auth }: HttpContextContract) {
    await auth.user!.load('groups')
    return auth.user
  }
}
