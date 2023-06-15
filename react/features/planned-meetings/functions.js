import { parseURIString, safeDecodeURIComponent } from '../base/util';
import { PlannedMeetingEntry } from './interfaces';

/**
 * Transforms the history list to a displayable list.
 *
 * @private
 * @param {Array<Object>} plannedMeetings - The recent list form the redux store.
 * @returns {Array<Object>}
 */
export function toDisplayableList(plannedMeetings: Array<PlannedMeetingEntry>) {

    const jwt = APP.store.getState()['features/base/jwt'].jwt;

    const tmp = (
        [...plannedMeetings].reverse()
            .map(item => {
                return {
                    date: item.date,
                    duration: item.duration,
                    time: [item.date],
                    title: item.title,
                    url: `${item.title.replace(' ', '')}?jwt=${jwt}`,
                    guid: item.guid
                };
            }));
            
    return tmp;
}