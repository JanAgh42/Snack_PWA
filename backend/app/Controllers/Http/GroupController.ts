import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GroupJSON, IGroupRepository } from '@ioc:Repositories/GroupRepository'

import GroupValidator from 'App/Validators/GroupValidator'

@inject(['Repositories/GroupRepository'])
export default class GroupController {
  constructor (private groupRepository: IGroupRepository) {}

  async createNewGroup({ request, auth }: HttpContextContract): Promise<GroupJSON> {
    const data = await request.validate(GroupValidator);
    const group = await this.groupRepository.createNewGroup(data.name, data.color, data.isPrivate, auth.user!);

    return group;
  }

  async joinGroup({ request, auth }: HttpContextContract): Promise<GroupJSON> {
    const groupName = request.input('groupName');
    const group = await this.groupRepository.joinGroup(groupName, auth.user!);

    return group;
  }
}
