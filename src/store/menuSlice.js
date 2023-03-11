import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        value: 'trucks',
        truckid:'',
        partid:'',
        edittruck:false,
        editpart:false,
        newtruck:false,
        newpart:false
    },
    reducers: {
        loadTrucks: (state) => {
            state.value="trucks"
            state.truckid=''
            state.partid=''
            state.edittruck = false;
            console.log('Called Load Trucks')

        },
        loadAllCategories: (state) => {
            state.value="category";
        },
        loadAllParts : (state) => {
            state.value="category";
            state.truckid = '';
        },
        loadCategories: (state,action) => {
            state.value="category";
            state.truckid = action.payload
        },
        loadEditTruck: (state) => {
            state.edittruck = !state.edittruck
            state.editpart = false;
        },
        loadEditPart: (state,action) => {
            state.edittruck = false;
            state.partid = action.payload.partid;
            // state.truckid = action.payload.truckid;
            state.editpart = !state.editpart;
        },
        loadNewTruck:(state) => {
            state.editpart = false;
            state.edittruck = false;
            state.newtruck = !state.newtruck;
        },
        loadNewPart:(state) => {
            state.editpart = false;
            state.edittruck = false;
            state.newtruck = false;
            state.newpart = !state.newpart;
        }
    },
})

// Action creators are generated for each case reducer function
export const { loadTrucks, loadCategories, loadEditTruck, loadEditPart, loadAllCategories, loadNewTruck, loadNewPart, loadAllParts } = menuSlice.actions

export default menuSlice.reducer