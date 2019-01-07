import {ICheckInLike, ICheckOutLike, IPopulateLikes} from "../action";

export const LikeReducer = (
  state = {},
  action: ICheckOutLike | ICheckInLike | IPopulateLikes
) => {
  switch (action.type) {
    case 'POPULATE_LIKES_LIST' :
      const newState = {...state};
      for (const cid in action.likes) {
        newState[cid] = action.likes[cid];
      }
      return newState;

    case 'CHECKIN_LIKE':
      const newState1 = {...state};
      newState1[action.cid] = {
        uid: action.cid,
        cid: action.cid,
      }
      return newState1;

    case 'CHECKOUT_LIKE':
      const newState2 = {...state};
      delete newState2[action.cid];
      return newState2;

    default:
      return state;
  }
};