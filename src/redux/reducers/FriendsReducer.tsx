import {IAddFriend, IPopulateFriends} from "../action";
import {ICatalog} from "../IStore";

export const FriendsReducer = (
  state = {},
  action: IAddFriend | IPopulateFriends
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
    default:
      return state;
  }
};