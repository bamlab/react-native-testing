import { Store as ReduxStore } from 'redux';

import { AppState } from '../modules/types';

class StoreManager {
  private _store?: ReduxStore<AppState> = undefined;
  private static _instance: StoreManager;

  public static getInstance = () => {
    if (!StoreManager._instance) {
      StoreManager._instance = new StoreManager();
    }

    return StoreManager._instance;
  };

  public set store(store: ReduxStore<AppState>) {
    this._store = store;
  }
  public get store() {
    if (!this._store) {
      throw Error('Store not yet configured');
    }

    return this._store;
  }
}

export const storeManager = StoreManager.getInstance();
