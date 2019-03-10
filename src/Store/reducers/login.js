const initialState = {
    userAccess: false,
    user: []
}
const user = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'LOGIN_USER':
                payload.userAccess = payload.login === "LoggedIn" ? true : false;
                state = {...payload};
            return {
                ...state
            }
        case 'LOGOUT_USER':
            state = {};
            return {
                ...state
            }
        case 'LOGIN_ADMIN' :
                payload.adminAccess = payload.login === "LoggedIn" ? true : false;
                state = {...payload};
            return {
                ...state
            }
        default:
            return state
    }
}
  
export default user