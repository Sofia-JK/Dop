import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    message: undefined,
    error: undefined
}

export const reqSlice = createSlice({
    name: 'req',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.message = undefined
            state.error = undefined
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(reqThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(reqThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.message = payload.message
            state.loading = false
        })
        builder.addCase(reqThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload
            state.loading = false
        })
    }
})

export const reqThunk = createAsyncThunk("reqThunk", async (data, { rejectWithValue }) => {
    try {
        const host = window.location.hostname;
        const result = await fetch(`http://${host}:3000/addRequests/`, {
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

export const yesThunk = createAsyncThunk("yesThunk", async (data, { rejectWithValue }) => {

    const { id } = data

    try {
        const host = window.location.hostname;
        const result = await fetch(`http://${host}:3000/yes/`, {
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
        window.location.reload();
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue("Чтото пошло не так")
    }
})

export const noThunk = createAsyncThunk("noThunk", async (data, { rejectWithValue }) => {

    const { id } = data

    try {
        const host = window.location.hostname;
        const result = await fetch(`http://${host}:3000/no/`, {
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
        return alert('Заявка отправлена')
    } catch (error) {
        console.log(error);
        return rejectWithValue("Что-то пошло не так")
    }
})

// Action creators are generated for each case reducer function
export const { reset } = reqSlice.actions

export default reqSlice.reducer