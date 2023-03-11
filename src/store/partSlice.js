import { createSlice } from "@reduxjs/toolkit";

export const partSlice = createSlice({
    name: 'parts',
    initialState: {
        parts:[]
    },
    reducers: {
        setParts: (state,action) => {
            state.parts = action.payload
        },
        addParts: (state,action) => {
            let newParts = [...state.parts]
            state.parts = [...newParts,action.payload]
        },
        editParts: (state,action) => {
                let newParts = state.parts.map(part => {
                    let item = {...part};
                    if(item._id === action.payload._id){
                        console.log('found the part')
                        item = action.payload
                    }
                    return item;
                })
            state.parts = [...newParts];
        },
        removeParts: (state,action) => {
            let newParts = state.parts.filter(part => part._id !== action.payload._id)
            state.parts = [...newParts];
            // state.parts = state.parts.filter(part => part._id !== action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setParts, addParts, removeParts, editParts} = partSlice.actions

export default partSlice.reducer