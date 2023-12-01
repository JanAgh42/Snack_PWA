import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany
} from '@ioc:Adonis/Lucid/Orm'

import GroupMessage from './GroupMessage'
import Group from './Group'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => GroupMessage, {
    foreignKey: 'user_id',
  })
  public groupMessages: HasMany<typeof GroupMessage>

  @manyToMany(() => Group, {
    pivotTable: 'groups_users',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'group_id',
    pivotTimestamps: true,
  })
  public groups: ManyToMany<typeof Group>

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
