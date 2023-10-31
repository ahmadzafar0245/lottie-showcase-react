// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Part 2
export interface IssueInitialState {
    savedAni: string[]
}
const initialState: IssueInitialState = {
    savedAni: []
}

// Part 3
export const saveSlice = createSlice({
    name: 'animations',
    initialState,
    reducers: {
        addAnimation: (state, action: PayloadAction<string>) => {
            state.savedAni = [...state.savedAni, action.payload]
        }
    }
})

// Part 4
export const { addAnimation } = saveSlice.actions
export default saveSlice.reducer
