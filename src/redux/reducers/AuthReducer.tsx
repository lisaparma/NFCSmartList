import {IAuthentication} from "../action";

export const AuthReducer = (
  state = {},
  action: IAuthentication
) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        auth: true,
      };
    case 'LOGOUT':
      return {
        auth: false,
      }
    // case 'ADD_CATALOG':
    //   return {
    //     ...state,
    //     catalogs: [...state.catalogs, {id: action.id, name: action.name}],
    //   }
    default:
      return state;
  }
};