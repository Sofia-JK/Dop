import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    message: undefined,
    error: undefined
}

export const newSlice = createSlice({
    name: 'new',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.message = undefined
            state.error = undefined
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(newThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(newThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.message = payload.message
            state.loading = false
        })
        builder.addCase(newThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload
            state.loading = false
        })
    }
})

export const newThunk = createAsyncThunk("newThunk", async (data, { rejectWithValue }) => {
    try {
        const host = window.location.hostname;
        const result = await fetch(`http://${host}:3000/newPassword`, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        await result.json()
        if (result.status === 400) {
            return alert("Старый пароль введён не верно")
        }
        return alert("Пароль успешно обновлён")
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

// Action creators are generated for each case reducer function
export const { reset } = newSlice.actions

export default newSlice.reducer