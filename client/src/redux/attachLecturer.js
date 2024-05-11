import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    message: undefined,
    error: undefined
}

export const attachSlice = createSlice({
    name: 'attach',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.message = undefined
            state.error = undefined
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(attachThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(attachThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.message = payload.message
            state.loading = false
        })
        builder.addCase(attachThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload
            state.loading = false
        })
    }
})

export const attachThunk = createAsyncThunk("attachThunk", async (data, { rejectWithValue }) => {
    try {
        const host = window.location.hostname;
        const result = await fetch(`http://${host}:3000/attachLectorer`, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            rejectWithValue(json)
        }
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue("Чтото пошло не так")
    }
})

export const { reset } = attachSlice.actions

export default attachSlice.reducer
