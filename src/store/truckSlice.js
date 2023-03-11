import { createSlice } from "@reduxjs/toolkit";

export const truckSlice = createSlice({
    name: 'trucks',
    initialState: {
        trucks: [],
        makes:[],
        categories:[]
    },
    reducers: {
        setTrucks: (state,action) => {
            state.trucks = action.payload
        },
        setMakes: (state,action) => {
            state.makes = action.payload
        },
        removeMakes: (state,action) => {
                let newMakes = [...state.makes];
                newMakes.map(make => {
                    make.models.map(model => {
                        if(model.name === action.payload.model){
                            model.quantity -= 1;
                            make.total -= 1;
                            return make;
                        }
                    })
                })
                state.makes = [...newMakes];
        
        },
        setCategories: (state,action) => {
            state.categories = action.payload
        },
        addTrucks: (state,action) => {
            state.trucks = [...state.trucks,action.payload]
        },
        editTrucks: (state,action) => {
                let trucks = state.trucks.map(truck => {
                    let myTruck = {...truck}
                    if(myTruck._id === action.payload._id){
                        myTruck = action.payload;
                    }
                    return myTruck;
                })
                state.trucks = [...trucks]
        },
        removeTrucks: (state,action) => {
            const newTrucks = state.trucks.filter(truck => truck._id !== action.payload._id)
            state.trucks = [...newTrucks];
            console.log('Called Remove Truck')
        }
    },
})

// Action creators are generated for each case reducer function
export const { setTrucks, setMakes, setCategories, addTrucks, removeTrucks, editTrucks, removeMakes } = truckSlice.actions

export default truckSlice.reducer