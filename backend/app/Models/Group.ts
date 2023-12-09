import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'

import GroupMessage from './GroupMessage'
import User from './User';

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public color: string;

  @column()
  public ownerId: number;

  @column()
  public isPrivate: boolean;

  @column.dateTime({
    serializeAs: null,
    autoCreate: true
  })
  public createdAt: DateTime;

  @column.dateTime({
    serializeAs: null,
    autoCreate: true,
    autoUpdate: true
  })
  public updatedAt: DateTime;

  @hasMany(() => GroupMessage, {
    serializeAs: 'groupMessages',
    foreignKey: 'groupId',
  })
  public groupMessages: HasMany<typeof GroupMessage>;

  @manyToMany(() => User, {
    pivotTable: 'groups_users',
    pivotForeignKey: 'group_id',
    pivotRelatedForeignKey: 'user_id',
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>
}
