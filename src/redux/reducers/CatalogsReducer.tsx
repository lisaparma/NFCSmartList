import {IPopulateCatalogs} from "../action";

export const CatalogsReducer = (
  state = {},
  action: IPopulateCatalogs
) => {
  switch (action.type) {
    case 'POPULATE_CATALOGS_LIST' :
      const newState = {...state};
      if (typeof action.catalogs === "undefined" || action.catalogs === null) {
        return state;
      }
      for (const id in action.catalogs) {
        if (!action.catalogs.hasOwnProperty(id)) { continue; }
        newState[id] = action.catalogs[id];
      }
      return newState;
    default:
      return state;
  }
};