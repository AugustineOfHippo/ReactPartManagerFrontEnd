import truckReducers from "./truck";
import partReducers from "./part";
import categoryReducers from "./category";
import makesReducer from "./make";
import userReducer from "./user";
import selectedTruckReducer from "./selectedtruck";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    trucks:truckReducers,
    parts:partReducers,
    categories:categoryReducers,
    makes:makesReducer,
    user:userReducer,
    selectedtruck:selectedTruckReducer
})

export default allReducers;