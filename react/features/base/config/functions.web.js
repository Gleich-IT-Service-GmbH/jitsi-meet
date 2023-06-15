// @flow

import { TOOLBAR_BUTTONS } from './constants';

export * from './functions.any';

/**
 * Removes all analytics related options from the given configuration, in case of a libre build.
 *
 * @param {*} config - The configuration which needs to be cleaned up.
 * @returns {void}
 */
export function _cleanupConfig(config: Object) { // eslint-disable-line no-unused-vars
}

/**
 * Returns the dial out url.
 *
 * @param {Object} state - The state of the app.
 * @returns {string}
 */
export function getDialOutStatusUrl(state: Object): string {
    return state['features/base/config'].guestDialOutStatusUrl;
}

/**
 * Returns the dial out status url.
 *
 * @param {Object} state - The state of the app.
 * @returns {string}
 */
export function getDialOutUrl(state: Object): string {
    return state['features/base/config'].guestDialOutUrl;
}

/**
 * Returns the replaceParticipant config.
 *
 * @param {Object} state - The state of the app.
 * @returns {boolean}
 */
export function getReplaceParticipant(state: Object): string {
    return state['features/base/config'].replaceParticipant;
}

/**
 * Returns the list of enabled toolbar buttons.
 *
 * @param {Object} state - The redux state.
 * @returns {Array<string>} - The list of enabled toolbar buttons.
 */
export function getToolbarButtons(state: Object): Array<string> {
    const { toolbarButtons, custom } = state['features/base/config'];
    const { jwt } = state['features/base/jwt'];

    if (Array.isArray(toolbarButtons)) {
        return toolbarButtons;
    } else {
        let availableToolbarButtons = [];
        if (jwt) {
            availableToolbarButtons = TOOLBAR_BUTTONS
        } else {
            /*
            availableToolbarButtons = [
                // 'camera',
                'chat',
                'closedcaptions',
                // 'desktop',
                // 'download',
                // 'embedmeeting',
                // 'etherpad',
                'feedback',
                'filmstrip',
                'fullscreen',
                'hangup',
                'help',
                // 'invite',
                // 'livestreaming',
                // 'microphone',
                // 'mute-everyone',
                // 'mute-video-everyone',
                'participants-pane',
                // 'profile',
                // 'raisehand',
                // 'recording',
                // 'security',
                // 'select-background',
                'settings',
                // 'shareaudio',
                // 'sharedvideo',
                // 'shortcuts',
                'stats',
                'tileview',
                // 'toggle-camera',
                'videoquality'
            ];
            */

            availableToolbarButtons = [
                'chat',
                'closedcaptions',
                'feedback',
                'filmstrip',
                'fullscreen',
                'hangup',
                'help',
                'participants-pane',
                'settings',
                'stats',
                'tileview',
                'videoquality'
            ];

            if (custom && custom.allowViewerToSpeak) {
                availableToolbarButtons.push(
                    'microphone',
                    'raisehand'
                );
            }
        }

        return availableToolbarButtons;
    }
}

/**
 * Checks if the specified button is enabled.
 *
 * @param {string} buttonName - The name of the button.
 * {@link interfaceConfig}.
 * @param {Object|Array<string>} state - The redux state or the array with the enabled buttons.
 * @returns {boolean} - True if the button is enabled and false otherwise.
 */
export function isToolbarButtonEnabled(buttonName: string, state: Object | Array<string>) {
    const buttons = Array.isArray(state) ? state : getToolbarButtons(state);

    return buttons.includes(buttonName);
}
