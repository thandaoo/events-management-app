import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { eventsApi } from "../../apis/events";
import types from './types';

export const eventsListGetApiReq = createAsyncThunk(
    types.eventsListGetApiReq,
    async(_, {getState, rejectWithValue }) => {
        try {
            const source = axios.CancelToken.source();
            const request = {
                params: {

                }
            }
            const response = await eventsApi({
                source, request
            });
            return response;
        } catch (error) {
            console.log('error: ', error);
            return rejectWithValue({
                message: error,
                cancelled: false,
            })
        }
    }
)