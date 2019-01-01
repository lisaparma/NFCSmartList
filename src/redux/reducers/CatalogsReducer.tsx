import {
  IAddCatalog,
  IAddItem,
  ICheckInItem, ICheckOutItem, IEditCatalog,
  IEditItem,
  IPopulateCatalogs,
  IRemoveCatalog,
  IRemoveItem
} from "../action";
import {ICatalog} from "../IStore";

export const CatalogsReducer = (
  state: { [id: string]: ICatalog}  = {
  },
  action: IPopulateCatalogs | IAddCatalog | IRemoveCatalog | IAddItem | IRemoveItem | IEditItem | ICheckInItem | ICheckOutItem | IEditCatalog
) => {
  switch (action.type) {
    case 'POPULATE_CATALOGS_LIST' :
      const newState = {...state};
      for (const cid in action.catalogs) {
        newState[cid] = action.catalogs[cid];
        for (const iid in action.catalogs[cid]["items"]) {
          action.catalogs[cid]["items"][iid].check = false;
        }
      }
      return newState;

    case 'ADD_CATALOG':
      const newState2 = {...state};
      newState2[action.cid] = {
        cid: action.cid,
        name: action.name,
        description: action.description,
        class: "standard",
        items: {}
      };
      return newState2;

    case 'REMOVE_CATALOG':
      const newState3 = {...state};
      delete newState3[action.cid];
      return newState3;

    case 'EDIT_CATALOG':
      const state_editC = {...state};
      state_editC[action.cid].name = action.name;
      state_editC[action.cid].description = action.description;
      return state_editC;

    case 'ADD_ITEM':
      const newState4 = {...state};
      if (!newState4[action.cid]["items"]) {
        newState4[action.cid]["items"] = {};
      }
      newState4[action.cid]["items"][action.iid] = {
        iid: action.iid,
        name:  action.name,
        description: action.description,
        check: false,
      };
      return newState4;

    case 'REMOVE_ITEM':
      const newState5 = {...state};
      delete newState5[action.cid]["items"][action.iid];
      return newState5;

    case 'EDIT_ITEM':
      const newState6 = {...state};
      newState6[action.cid]["items"][action.iid].name = action.name;
      newState6[action.cid]["items"][action.iid].description = action.description;
      return newState6;

    case 'CHECKIN_ITEM':
      const newState7 = {...state};
      if (!newState7[action.cid]["check"]) {
        newState7[action.cid]["check"] = {};
      }
      newState7[action.cid]["check"][action.iid] = {
        iid: action.iid,
        name:  action.name,
      };
      newState7[action.cid]["items"][action.iid].check = true;
      return newState7;

    case 'CHECKOUT_ITEM':
      const newState8 = {...state};
      delete newState8[action.cid]["check"][action.iid];
      newState8[action.cid]["items"][action.iid].check = false;
      return newState8;


    default:
      return state;
  }
};