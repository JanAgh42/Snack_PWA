import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GroupValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.minLength(4),
      rules.unique({ table: 'groups', column: 'name' })
    ]),
    color: schema.string(),
    isPrivate: schema.boolean()
  })

  public messages: CustomMessages = {}
}
