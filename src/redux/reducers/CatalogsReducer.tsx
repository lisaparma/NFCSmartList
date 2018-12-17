import {IAddCatalog, IPopulateCatalogs} from "../action";

export const CatalogsReducer = (
  state = {
  },
  action: IPopulateCatalogs | IAddCatalog
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
        name: action.name
      };
      return newState2;
    default:
      return state;
  }
};