import {
    ADD_PLANNED_MEETING_ENTRY,
    UPDATE_PLANNED_MEETING_ENTRY,
    DELETE_PLANNED_MEETING_ENTRY,
} from "./actionsTypes";

import { PlannedMeetingEntry } from "./interfaces";

export function addPlannedMeetingEntry(entry: PlannedMeetingEntry) {
    return {
        type: ADD_PLANNED_MEETING_ENTRY,
        entry
    };
}

export function updatePlannedMeetingEntry(entry: PlannedMeetingEntry) {
    return {
        type: UPDATE_PLANNED_MEETING_ENTRY,
        entry
    };
}

export function deletePlannedMeetingEntry(entry: PlannedMeetingEntry) {
    return {
        type: DELETE_PLANNED_MEETING_ENTRY,
        entry
    }
}
