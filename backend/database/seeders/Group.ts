import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Group from 'App/Models/Group'

export default class extends BaseSeeder {
  public async run() {
    const uniqueKey = 'name'

    await Group.updateOrCreateMany(uniqueKey, [
      {
        name: 'General',
        color: 'bg-purple-7'
      },
    ])
  }
}
