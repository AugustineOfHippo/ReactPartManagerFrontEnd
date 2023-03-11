const categoryReducers = (state = [],action) => {
    switch(action.type){
        case 'GETCATEGORIES':
            return state;
        case 'SETCATEGORIES':
            return state = action.payload;
        default:
            return state;
    }
}

export default categoryReducers;