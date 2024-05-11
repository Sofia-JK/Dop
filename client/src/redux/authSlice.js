import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    token: localStorage.getItem('token'),
    role: localStorage.getItem("role"),
    email: localStorage.getItem("email"),
    fio: localStorage.getItem("fio"),
    id: localStorage.getItem("id"),
    error: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.error = undefined
            state.loading = true
            state.email = undefined
            state.fio = undefined
            state.role = undefined
            state.token = undefined
            state.id = undefined

            localStorage.removeItem("email")
            localStorage.removeItem("fio")
            localStorage.removeItem("role")
            localStorage.removeItem("token")
            localStorage.removeItem("id")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const payload = action.payload
            state.email = payload.user.email
            state.fio = payload.user.fio
            state.role = payload.user.role
            state.token = payload.token
            state.id = payload.id

            localStorage.setItem("email", payload.user.email)
            localStorage.setItem("fio", payload.user.fio)
            localStorage.setItem("role", payload.user.role)
            localStorage.setItem("token", payload.token)
            localStorage.setItem("id", payload.user.id)

            state.error = undefined
            state.loading = false
        })
        builder.addCase(loginThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.message
            state.loading = false
        })
    }
})

export const loginThunk = createAsyncThunk("logThunk", async (data, { rejectWithValue }) => {
    const { email, password } = data

    try {
        const host = window.location.hostname;
        const result = await fetch(`http://${host}:3000/auth`, {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            return rejectWithValue(json)
        }
        window.location.reload();
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer