export const getUser = () => {
    return {
        type:'GETUSER'
    }
}

export const setUser = (nr) => {
    return {
        type:'SETUSER',
        payload:nr
    }
}

export const setSelectedTruck = (nr) => {
    return {
        type:'SETSELECTEDTRUCK',
        payload:nr
    }
}

export const setRefreshUser = (nr) => {
    return {
        type:'SETREFRESHUSER',
        payload:nr
    }
}
export const setUserDetails = (nr) => {
    return {
        type:'SETUSERDETAILS',
        payload:nr
    }
}


export const getTrucks = () => {
    return {
        type:'GETTRUCKS'
    }
}
export const setTrucks = (nr) => {
    return {
        type:'SETTRUCKS',
        payload:nr
    }
}
export const addTruck = (nr) => {
    return {
        type:'ADDTRUCK',
        payload:nr
    }
}
export const deleteTruck = (nr) => {
    return {
        type:'DELETETRUCK',
        payload:nr
    }
}

export const getParts = () => {
    return {
        type:'GETPARTS'
    }
}

export const addPart = (nr) => {
    return {
        type:'ADDPART',
        payload:nr
    }
}

export const setParts = (nr) => {
    return {
        type:'SETPARTS',
        payload:nr
    }
}

export const deletePart = (nr) => {
    return {
        type: 'DELETEPART',
        payload:nr
    }
}

export const getCategories = () => {
    return {
        type:'GETCATEGORIES'
    }
}

export const setCategories = (nr) => {
    return {
        type:'SETCATEGORIES',
        payload:nr
    }
}

export const getMakes = () => {
    return {
        type:'GETMAKES'
    }
}

export const setMakes = (nr) => {
    return {
        type:'SETMAKES',
        payload:nr
    }
}
export const  addMake = (nr) => {
    return {
        type:'ADDMAKE',
        payload:nr
    }
}