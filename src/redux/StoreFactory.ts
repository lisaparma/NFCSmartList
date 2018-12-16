import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {IStore} from "./IStore";

import {AuthReducer} from "./reducers/AuthReducer";
import {InitialState} from "./InitialState";
import {UserReducer} from "./reducers/UserReducer";
import {CatalogsReducer} from "./reducers/CatalogsReducer";

export class StoreFactory {

  public createStore(): Store<IStore> {

    const Store: Store<IStore> = createStore(
      combineReducers({
        auth: AuthReducer,
        user: UserReducer,
        catalogs: CatalogsReducer
      })
      //InitialState,
      //applyMiddleware(),
    );
    return Store;
  }

}