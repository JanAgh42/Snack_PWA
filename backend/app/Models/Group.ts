import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'

import GroupMessage from './GroupMessage'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public color: string

  @column.dateTime({
    serializeAs: null,
    autoCreate: true
  })
  public createdAt: DateTime

  @column.dateTime({
    serializeAs: null,
    autoCreate: true,
    autoUpdate: true
  })
  public updatedAt: DateTime

  @hasMany(() => GroupMessage, {
    serializeAs: 'groupMessages',
    foreignKey: 'groupId',
  })
  public groupMessages: HasMany<typeof GroupMessage>
}
