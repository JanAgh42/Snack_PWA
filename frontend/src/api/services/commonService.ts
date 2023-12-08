import CommonSocketManager from '../managers/entity_managers/commonSocketManager';

class CommonService {
  private common: CommonSocketManager = null;

  public subscribeToCommonSocket(): CommonSocketManager {
    if (this.common != null) {
      console.log('User is already subscribed to common socket.');
    }

    this.common = new CommonSocketManager(`/common`);

    return this.common;
  }

  public unsubscribeFromCommonSocket(): boolean {
    if (!this.common) return false;

    this.common.destroy();
    this.common = null;

    return true;
  }

  public getCommonSocket(): CommonSocketManager | null {
    return this.common;
  }
}

export default new CommonService();
