/**
 * Action type to signal the addition of a entry.
 *
 * {
 *     type: ADD_PLANNED_MEETING_ENTRY,
 *     entry: PlannedMeetingEntry
 * }
 */
export const ADD_PLANNED_MEETING_ENTRY = 'ADD_PLANNED_MEETING_ENTRY';

/**
 * Action type to signal that a new info is available.
 *
 * {
 *     type: UPDATE_PLANNED_MEETING_ENTRY,
 *     entry: PlannedMeetingEntry
 * }
 *
 * @protected
 */
export const UPDATE_PLANNED_MEETING_ENTRY = 'UPDATE_PLANNED_MEETING_ENTRY';

/**
 * Action type to signal the deletion of a entry.
 *
 * {
 *     type: DELETE_PLANNED_MEETING_ENTRY,
 *     entry: PlannedMeetingEntry
 * }
 * 
 * @protected
 */
export const DELETE_PLANNED_MEETING_ENTRY = 'DELETE_PLANNED_MEETING_ENTRY';