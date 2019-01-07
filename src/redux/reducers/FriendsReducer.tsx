import {IAddFriend, IAddFriend2, IFrCheckInItem, IFrCheckOutItem, IPopulateFriends} from "../action";
import {ICatalog} from "../IStore";

export const FriendsReducer = (
  state = {},
  action: IAddFriend | IPopulateFriends |IFrCheckInItem | IFrCheckOutItem | IAddFriend2
) => {
  switch (action.type) {
    case 'POPULATE_FRIENDS_LIST' :
      const newState = {...state};
      for (const uid in action.friends) {
        newState[uid] = action.friends[uid];
        for (const cid in action.friends[uid].catalogs) {
          newState[uid]["catalogs"][cid] = action.friends[uid].catalogs[cid];
          for (const iid in action.friends[uid].catalogs[cid]["items"]) {
            newState[uid]["catalogs"][cid]["items"][iid].check = false;
          }
        }
      }
      return newState;

    case 'ADD_FRIEND' :
      const newState2 = {...state};
      newState2[action.uid] = {
        uid: action.uid,
        email: action.email,
        catalogs: action.catalogs,
      };
      return newState2;

    case 'ADD_FRIEND2' :
      const newStatex = {...state};
      newStatex[action.friend.uid] = action.friend;
      return newStatex;

    case 'FR_CHECKIN_ITEM':
      const newState3 = {...state};
      if (!newState3[action.uid].catalogs[action.cid]["check"]) {
        newState3[action.uid].catalogs[action.cid]["check"] = {};
      }
      newState3[action.uid].catalogs[action.cid]["check"][action.cid] = {
        iid: action.iid,
        name:  action.name,
      };
      newState3[action.uid].catalogs[action.cid]["items"][action.iid].check = true;
      return newState3;

    case 'FR_CHECKOUT_ITEM':
      const newState4 = {...state};
      delete newState4[action.uid].catalogs[action.cid]["check"][action.iid];
      newState4[action.uid].catalogs[action.cid]["items"][action.iid].check = false;
      return newState4;

    default:
      return state;
  }
};