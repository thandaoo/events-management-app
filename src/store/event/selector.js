const getEventsListData =(state) => state.event.events_list.data;
const getEventsListStatus = (state) => state.event.events_list.status;

export default {
    getEventsListData,
    getEventsListStatus
}