import eventSlice from './reducer';
import eventState from './selector';
import {
    eventsListGetApiReq
} from './thunks';

const {actions, reducer } = eventSlice;

export default reducer;
export const eventActions ={
    ...actions,
    eventsListGetApiReq,
};

export {eventState};