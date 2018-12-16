import {applyMiddleware, combineReducers, compose, createStore, Reducer, Store} from "redux";
import {IStore} from "./IStore";
import {AuthReducer} from "./reducers/AuthReducer";

import {InitialState} from "./InitialState";
import {UserReducer} from "./reducers/UserReducer";

export class StoreFactory {

  public createStore(): Store<IStore> {

    const Store: Store<IStore> = createStore(
      combineReducers({
        auth: AuthReducer,
        user: UserReducer
      })
      //InitialState,
      //applyMiddleware(),
    );
    return Store;
  }

}