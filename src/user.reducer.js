import { userConstants } from './user.constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
    {  
      const users_list = state.items || action.users ;
      console.log(state);
        return {
          ...state,
          loading: false,
          updated: false,
          items: users_list,
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
        const user = [0];
        user.push(action.user);
        console.log(state.items);
        if (state.items) {
        return { ...state,
          registering: false,
          items: state.items.concat([user])
         };
        }
        else {
          return { ...state,
            registering: false,
            items: [user] };
        }
        
      }
    case userConstants.CREATE_FAILURE:
      return {};

    case userConstants.UPDATE_REQUEST:
      return { ...state,
        updating: true };

    case userConstants.UPDATE_SUCCESS:
      { 
        const edited_user = [0];
        edited_user.push(action.user);
        return { ...state,
          updating: false,
          updated: true,
          items: state.items.map(user =>
            parseInt(user[1].id) === action.user.id
              ? edited_user
              : user )};  
      }

    case userConstants.UPDATE_FAILURE:
      return {};
    
    case userConstants.DELETE_REQUEST:
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