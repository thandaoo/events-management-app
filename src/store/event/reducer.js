import { createSlice } from "@reduxjs/toolkit";
import { eventsListGetApiReq } from "./thunks";

const INITIAL_STATE = {
    events_list: {
        data: [], 
        status: {
            loading: false,
            error: false,
            ok: false,
            message: false,
        }
    },

}

const eventSlice = createSlice({
    name: 'event', 
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: {
        [eventsListGetApiReq.pending]: (state) => {
            state.events_list = INITIAL_STATE.events_list;
            state.events_list.status.loading = true;
        },
        [eventsListGetApiReq.rejected]: (state, {error, payload}) => {
            state.events_list.status.loading = false;
            state.events_list.status.error = true;
            state.events_list.status.message = payload ? payload.message : error.message;
        },
        [eventsListGetApiReq.fulfilled]: (state, {payload}) => {
            state.events_list.status.loading = false;
            state.events_list.status.ok = true;
            state.events_list.data = payload.data;
        }
    }
});

export default eventSlice;