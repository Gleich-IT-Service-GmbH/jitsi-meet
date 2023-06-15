import { APP_WILL_MOUNT } from "../base/app";
import { MiddlewareRegistry } from "../base/redux";
import {
    addPlannedMeetingEntry,
    deletePlannedMeetingEntry,
    updatePlannedMeetingEntry
} from "./actions";
import {
    ADD_PLANNED_MEETING_ENTRY,
    DELETE_PLANNED_MEETING_ENTRY,
    UPDATE_PLANNED_MEETING_ENTRY
} from "./actionsTypes";

declare var APP: Object;

MiddlewareRegistry.register((store) => (next) => (action) => {
    switch (action.type) {
        case APP_WILL_MOUNT:
            return _appWillMount(store, next, action);

        case ADD_PLANNED_MEETING_ENTRY:
            return _addPlannedMeetingEntry(store, next, action);

        case UPDATE_PLANNED_MEETING_ENTRY:
            return _updatePlannedMeetingEntry(store, next, action);

        case DELETE_PLANNED_MEETING_ENTRY:
            return _deletePlannedMeetingEntry(store, next, action);
    }

    return next(action);
});

function _appWillMount({ dispatch, getState }, next, action) {
    const result = next(action);

    // Do sth.

    return result;
}

function _addPlannedMeetingEntry({ dispatch, getState }, next, action) {
    // dispatch(addPlannedMeetingEntry(action));

    return next(action);
}

function _updatePlannedMeetingEntry({ dispatch, getState }, next, action) {
    // dispatch(updatePlannedMeetingEntry(action));

    return next(action);
}

function _deletePlannedMeetingEntry({ dispatch, getState }, next, action) {
    // dispatch(deletePlannedMeetingEntry(action));

    return next(action);
}
