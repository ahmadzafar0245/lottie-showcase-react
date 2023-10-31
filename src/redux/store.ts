import { configureStore } from "@reduxjs/toolkit";
import saveSlice from "./slice/save.slice";
export const store = configureStore({
    reducer: {
        save: saveSlice
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
