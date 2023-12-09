import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GroupJSON, IGroupRepository } from '@ioc:Repositories/GroupRepository'
import Group from 'App/Models/Group';

import GroupValidator from 'App/Validators/GroupValidator'

@inject(['Repositories/GroupRepository'])
export default class GroupController {
  constructor (private groupRepository: IGroupRepository) {}

  public async createNewGroup({ request, auth }: HttpContextContract): Promise<GroupJSON> {
    const data = await request.validate(GroupValidator);
    const group = await this.groupRepository.createNewGroup(data.name, data.color, data.isPrivate, auth.user!);

    return group;
  }

  public async checkIfGroupExists({ params }: HttpContextContract): Promise<boolean> {
    const group = await Group.findBy('name', params.name);

    return group !== null;
  }

  public async checkIfGroupIsPrivate({ params }: HttpContextContract): Promise<boolean> {
    const group = await Group.findBy('name', params.name);

    return group!.isPrivate;
  }
}
