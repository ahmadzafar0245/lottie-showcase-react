import { configureStore } from "@reduxjs/toolkit";
import IssueReducer from "./slice/animation.slice";
import saveReducer from "./slice/animation.slice";

export const store = configureStore({
    reducer: {
        issue: IssueReducer,
        save: saveReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
