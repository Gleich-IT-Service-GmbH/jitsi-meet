import React from 'react';
import { applyMiddleware, Dispatch } from 'redux';

import { translate } from '../../base/i18n';
import { MeetingsList } from '../../base/react';
import { connect } from '../../base/redux';
import {
    addPlannedMeetingEntry,
    updatePlannedMeetingEntry,
    deletePlannedMeetingEntry
} from '../actions'
import { toDisplayableList } from '../functions'

import AbstractPlannedMeetingList from './AbstractPlannedMeetingList'
import { PlannedMeetingEntry } from '../interfaces'
import { getJwtName } from '../../base/jwt';
import { STORE_NAME } from '../interfaces';
import { ADD_PLANNED_MEETING_ENTRY } from '../actionsTypes';
import { openDialog } from '../../base/dialog';
import PlannedMeetingDialog, { DialogType } from './dialog/component/PlannedMeetingDialog';

declare var APP: Object;

type Props = {
    /**
     * Renders the list disabled.
     */
    disabled: Boolean,

    /**
     * Redux store dispatch function.
     */
    dispatch: Dispatch<any>,

    /**
     * Translate function.
     */
    t: Function,

    _entries: Array<PlannedMeetingEntry>
};

class PlannedMeetingList extends AbstractPlannedMeetingList<Props> {
    constructor(props: Props) {
        super(props);

        this._getRenderListEmptyComponent = this._getRenderListEmptyComponent.bind(this);
        this._onPress = this._onPress.bind(this);

        this._openAddDialog = this._openAddDialog.bind(this);

        this._onItemAdd = this._onItemAdd.bind(this);
        this._onItemUpdate = this._onItemUpdate.bind(this);
        this._onItemDelete = this._onItemDelete.bind(this);
    }

    _openAddDialog() {
        const {
            dispatch
        } = this.props;

        dispatch(openDialog(PlannedMeetingDialog, { entry: undefined, dialogType: DialogType.CREATE }))
    }

    _onItemAdd(entry) {
        // Open dialog
        // Dialog -> Dispatch
    }

    _onItemUpdate(entry) {
        const {
            dispatch
        } = this.props;

        dispatch(openDialog(PlannedMeetingDialog, { entry, dialogType: DialogType.UPDATE }))
    }

    _onItemDelete(entry) {
        const {
            dispatch
        } = this.props;

        dispatch(openDialog(PlannedMeetingDialog, { entry, dialogType: DialogType.DELETE }))
    }

    render() {
        const {
            disabled,
            _entries,
            t
        } = this.props;
        const plannedMeetings = toDisplayableList(_entries);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <button
                    onClick={this._openAddDialog}
                    className="welcome-page-button"
                    style={{ width: '97%', margin: '0.25em', marginBottom: '1em', padding: '0.25em' }}>
                    {t('plannedMeetings.addMeeting')}
                </button>
                <MeetingsList
                    disabled={disabled}
                    hideURL={true}
                    listEmptyComponent={this._getRenderListEmptyComponent()}
                    meetings={plannedMeetings}
                    onItemUpdate={this._onItemUpdate}
                    onItemDelete={this._onItemDelete}
                    onPress={this._onPress} />
            </div>
        )
    }
}

export function _mapStateToProps(state: Object) {
    return {
        _entries: state[STORE_NAME]
    };
}

export default translate(connect(_mapStateToProps)(PlannedMeetingList))