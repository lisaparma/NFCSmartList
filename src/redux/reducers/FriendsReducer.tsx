import {IAddFriend, IPopulateFriends} from "../action";

export const FriendsReducer = (
  state = {},
  action: IAddFriend | IPopulateFriends
) => {
  switch (action.type) {
    case 'POPULATE_FRIENDS_LIST' :
      const newState = {...state};
      for (const uid in action.friends) {
        newState[uid] = action.friends[uid];
      }
      return newState;

    case 'ADD_FRIEND' :
      const newState2 = {...state};
      newState2[action.uid] = {
        uid: action.uid,
        email: action.email,
      };
      return newState2;
    default:
      return state;
  }
};