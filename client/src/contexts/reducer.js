export const initialState = {
    user:null,
    chatId:null,
    chatInput:null,
};

export const actionTypes = {
    SET_USER : "SET_USER",
    SET_CHAT_INPUT: "SET_CHAT_INPUT",
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_CHAT_INPUT:
            return{
                ...state,
                chatId:action.chatId,
                chatInput:action.chatInput,
            };

        default:
            return state;
    }
};

export default reducer;