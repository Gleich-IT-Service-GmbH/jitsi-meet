/**
 * Interface for a planned meeting entry.
 */
export interface PlannedMeetingEntry {
    guid: string,
    title: string,
    url: string,
    date: number,
    time: Array<number>,
    duration: number
}

/**
 * Redux subtree of this feature.
 */
 export const STORE_NAME = "features/planned-meeting";
