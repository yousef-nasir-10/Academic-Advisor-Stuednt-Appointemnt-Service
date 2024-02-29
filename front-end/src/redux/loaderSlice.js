import {createSlice} from "@reduxjs/toolkit"

export const loaderSlice = createSlice ({
    name: "loader",
    initialState: {
        loading: false,
    },
    reducers: {
        ShowlLoader: (state, action )=>{
            state.loading = action.payload;
        },


    }
})

export const {ShowlLoader} = loaderSlice.actions