import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
    this.app.container.singleton('Repositories/WsGroupRepository', (container) => {
      return container.make('App/Repositories/WsGroupRepository');
    });

    this.app.container.singleton('Repositories/GroupRepository', (container) => {
      return container.make('App/Repositories/GroupRepository');
    });
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
