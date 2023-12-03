import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.regex(/[a-zA-Z][a-zA-Z ]+/)
    ]),
    nickname: schema.string([
      rules.trim(),
      rules.regex(/[\w-]+/),
      rules.minLength(5),
      rules.unique({ table: 'users', column: 'nickname' })
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    color: schema.string(),
    password: schema.string([
      rules.minLength(8)
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'unique': '{{ field }} must be unique.',
    'minLength': '{{ field }} should have at least {{ options.minLength }} characters.'
  }
}
