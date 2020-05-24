import { userConstants } from './user.constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      console.log(state);
      if (state.new_items) {  
        return {
          ...state,
          loading: false,
          items: action.users.concat(state.new_items)
          };
      }
      else {
        return {
          ...state,
          loading: false,
          items: action.users
          };
      }
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.CREATE_REQUEST:
      return { ...state,
        registering: true };

    case userConstants.CREATE_SUCCESS:
      { 
        const user = [];
        user.push([0,action.user]);
        console.log(state);
        if (state.new_items) {
        return { ...state,
          registering: false,
          new_items: state.new_items.concat(user) };
        }
        else {
          return { ...state,
            registering: false,
            new_items: user };
        }
        
      }
    case userConstants.CREATE_FAILURE:
      return {};

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user[1].id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user[1].id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}