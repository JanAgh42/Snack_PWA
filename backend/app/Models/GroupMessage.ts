import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'

import Group from './Group'
import User from './User'

export default class GroupMessage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public groupId: number

  @column()
  public textContent: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public author: BelongsTo<typeof User>

  @belongsTo(() => Group, {
    foreignKey: 'groupId',
  })
  public group: BelongsTo<typeof Group>
}
