import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    isLogin: boolean,
    userInfo: any,
}

const initialState: UserState = {
    isLogin: false,
    userInfo: {
        name: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<number>) => {
            state.userInfo = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions

export default userSlice.reducer