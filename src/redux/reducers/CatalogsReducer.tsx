import {IAddCatalog, IPopulateCatalogs, IRemoveCatalog} from "../action";

export const CatalogsReducer = (
  state = {
  },
  action: IPopulateCatalogs | IAddCatalog | IRemoveCatalog
) => {
  switch (action.type) {
    case 'POPULATE_CATALOGS_LIST' :
      const newState = {...state};
      for (const id in action.catalogs) {
        newState[id] = action.catalogs[id];
      }
      return newState;

    case 'ADD_CATALOG':
      const newState2= {...state};
      newState2[action.id] = {
        id: action.id,
        name: action.name,
        description: action.description,
        class: "standard",
      };
      return newState2;
    case 'REMOVE_CATALOG':
      const newState3= {...state};
      delete newState3[action.id];
      return newState3;
    default:
      return state;
  }
};