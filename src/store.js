import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./store/menuSlice";
import truckSlice from "./store/truckSlice";
import partSlice from "./store/partSlice";

export default configureStore({
    reducer: {
        trucks:truckSlice,
        menu:menuSlice,
        parts:partSlice
    },
})