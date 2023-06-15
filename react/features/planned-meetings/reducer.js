import { APP_WILL_MOUNT } from "../base/app";
import { PersistenceRegistry, ReducerRegistry } from "../base/redux";
import {
    ADD_PLANNED_MEETING_ENTRY,
    DELETE_PLANNED_MEETING_ENTRY,
    UPDATE_PLANNED_MEETING_ENTRY,
} from "./actionsTypes";
import { STORE_NAME } from "./interfaces";
import logger from "./logger";

/**
 * Default/initial redux state for feature {@code planned-meeting}.
 *
 * @type {Array<Object>}
 */
const DEFAULT_STATE = [];

//PersistenceRegistry.register(STORE_NAME);

ReducerRegistry.register(STORE_NAME, (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case APP_WILL_MOUNT:
            return _appWillMount(state);
        case ADD_PLANNED_MEETING_ENTRY:
            return _addPlannedMeetingEntry(state, action);

        case UPDATE_PLANNED_MEETING_ENTRY:
            return _updatePlannedMeetingEntry(state, action);

        case DELETE_PLANNED_MEETING_ENTRY:
            return _deletePlannedMeetingEntry(state, action);
    }

    return state;
});

function _appWillMount(state) {
    if (state && typeof state === "object") {
        if (Array.isArray(state)) {
            return state;
        }
    }

    return DEFAULT_STATE;
}

function _addPlannedMeetingEntry(state, action) {
    const newEntry = action.entry;
    const newState = state.slice();

    for (let i = 0; i < newState.length; i++) {
        if (newState[i].guid && newState[i].guid === newEntry.guid) {
            return _updatePlannedMeetingEntry(state, action);
        }
    }
    newState.push(newEntry);

    return _orderByDate(newState);
}

function _updatePlannedMeetingEntry(state, action) {
    const entry = action.entry;
    const newState = state.slice();

    for (let i = 0; i < newState.length; i++) {
        if (newState[i].guid === entry.guid) {
            newState[i].title = entry.title;
            newState[i].date = entry.date;
            break;
        }
    }

    return _orderByDate(newState);
}

function _deletePlannedMeetingEntry(state, action) {
    const entry = action.entry;
    const newState = state.slice().filter(v => v.guid !== entry.guid);

    return _orderByDate(newState);
}

function _orderByDate(newState) {
    return newState.sort((a, b) => b.date - a.date);
}
