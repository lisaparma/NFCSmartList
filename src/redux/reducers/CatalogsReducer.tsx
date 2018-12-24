import {IAddCatalog, IAddItem, IPopulateCatalogs, IRemoveCatalog} from "../action";

export const CatalogsReducer = (
  state = {
  },
  action: IPopulateCatalogs | IAddCatalog | IRemoveCatalog | IAddItem
) => {
  switch (action.type) {
    case 'POPULATE_CATALOGS_LIST' :
      const newState = {...state};
      for (const id in action.catalogs) {
        newState[id] = action.catalogs[id];
      }
      return newState;

    case 'ADD_CATALOG':
      const newState2 = {...state};
      newState2[action.cid] = {
        cid: action.cid,
        name: action.name,
        description: action.description,
        class: "standard",
      };
      return newState2;

    case 'REMOVE_CATALOG':
      const newState3 = {...state};
      delete newState3[action.id];
      return newState3;

    case 'ADD_ITEM':
      const newState4 = {...state};
      newState4[action.cid]["items"][action.iid] = {
        iid: action.iid,
        name:  action.name,
        description: action.description,
        tag: action.tag,
      };
      return newState4;

    default:
      return state;
  }
};