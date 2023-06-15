import { FieldTextStateless as TextField } from "@atlaskit/field-text";
import React, { useState } from "react";

import { Dialog } from '../../../../base/dialog';
import { translate } from "../../../../base/i18n";
import { connect } from "../../../../base/redux";
import { hideDialog } from "../../../../base/dialog/actions";
import { } from "../../../../base/i18n/dateUtil";

import { PlannedMeetingEntry } from "../../../interfaces";
import { addPlannedMeetingEntry, deletePlannedMeetingEntry, updatePlannedMeetingEntry } from "../../../actions";

export const DialogType = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

type Props = {
    dialogType: DialogType,

    entry?: PlannedMeetingEntry,

    t: Function,
    dispatch: Function
}

type State = {
    inAction: Boolean,
    title: String,
    date: Number
}

class PlannedMeetingDialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            inAction: false,
            title: props.entry?.title || '',
            date: props.entry?.date || 0
        }

        this._onChange = this._onChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onCancel = this._onCancel.bind(this);
        this._getDialogTitle = this._getDialogTitle.bind(this);
        this._getDialogContent = this._getDialogContent.bind(this);
        this._getDialogButtonText = this._getDialogButtonText.bind(this);
    }

    _getDialogTitle() {
        const {
            dialogType,
            t
        } = this.props;

        switch (dialogType) {
            case DialogType.CREATE:
                return (
                    t('plannedMeetings.dialog.titleCreate')
                );

            case DialogType.UPDATE:
                return (
                    t('plannedMeetings.dialog.titleUpdate')
                );

            case DialogType.DELETE:
                return (
                    t('plannedMeetings.dialog.titleDelete')
                );
        }

        return null;
    }

    _getDialogContent() {
        const {
            t,
            dialogType
        } = this.props;

        const {
            date,
            title
        } = this.state;

        switch (dialogType) {
            case DialogType.DELETE:
                return (t('plannedMeetings.dialog.deleteWarn'));

            default:
                const dateObj = new Date(date);
                return (
                    <>
                        <TextField
                            autoFocus={true}
                            className='input-control'
                            compact={false}
                            label={t('plannedMeetings.dialog.title')}
                            name='title'
                            placeholder={t('plannedMeetings.dialog.titlePlaceholder')}
                            shouldFitContainer={true}
                            type='text'
                            onChange={this._onChange}
                            value={title} />
                        <TextField
                            className='input-control'
                            compact={false}
                            label={t('plannedMeetings.dialog.date')}
                            name='date'
                            placeholder={t('plannedMeetings.dialog.datePlaceholder')}
                            shouldFitContainer={true}
                            type='datetime-local'
                            onChange={this._onChange}
                            value={date
                                && dateObj
                                && this._formatDateForInputField(dateObj)} />
                    </>
                )
        }

        return null;
    }

    _formatDateForInputField(date: Date) {


        if (!date) {
            return null;
        }

        let year = date.getFullYear();

        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }

        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }

        let hour = date.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }

        let minute = date.getMinutes();
        if (minute < 10) {
            minute = '0' + minute;
        }

        return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    _getDialogButtonText() {
        const {
            dialogType,
            t
        } = this.props;

        switch (dialogType) {
            case DialogType.CREATE:
                return (
                    t('plannedMeetings.dialog.buttonSave')
                );

            case DialogType.UPDATE:
                return (
                    t('plannedMeetings.dialog.buttonUpdate')
                );

            case DialogType.DELETE:
                return (
                    t('plannedMeetings.dialog.buttonDelete')
                );
        }

        return (
            null
        );
    }

    _onChange(ev: Event) {
        const value = ev.target.value;
        switch (ev.target.name) {
            case 'title':
                this.setState({ title: value });
                break;
            case 'date':
                const dateValue = Date.parse(value);
                if (!Number.isNaN(dateValue)) {
                    this.setState({ date: dateValue });
                }
                break;
            default:
                break;
        }
    }

    _onSubmit(ev) {
        const {
            dialogType,
            dispatch,
            entry
        } = this.props;

        const {
            title,
            date
        } = this.state;

        let url = 'token/meeting/';
        switch (dialogType) {
            case DialogType.CREATE:
                url += 'add';
                break;

            case DialogType.UPDATE:
                url += 'update';
                break;

            case DialogType.DELETE:
                url += 'delete';
                break;

            default:
                break;
        }

        const jwt = APP.store.getState()["features/base/jwt"]?.jwt;
        const uploadEntry = {
            guid: (entry?.guid || undefined),
            title: title,
            date: date,
            jwt: jwt
        };

        this.setState({ inAction: true });

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(uploadEntry)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            }

            throw new Error(resp.statusText);
        }).then(json => {

            uploadEntry.jwt = undefined;

            switch (dialogType) {
                case DialogType.CREATE:
                    uploadEntry.guid = json.data.guid;
                    dispatch(addPlannedMeetingEntry(uploadEntry));
                    break;

                case DialogType.UPDATE:
                    dispatch(updatePlannedMeetingEntry(uploadEntry));
                    break;

                case DialogType.DELETE:
                    dispatch(deletePlannedMeetingEntry(uploadEntry));
                    break;

                default:
                    break;
            }

            hideDialog(this);

        }).catch(error => {
            console.error(error);
        }).finally(() => {
            this.setState({ inAction: false });
        })
    }

    _onCancel() {
        hideDialog(this);
    }

    render() {
        const {
            inAction,
            title,
            date
        } = this.state;

        return (
            <Dialog
                disableBlanketClickDismiss={true}
                hideCancelButton={inAction}
                okDisabled={
                    inAction
                    || !title
                    || !date
                }
                okKey={this._getDialogButtonText()}
                onSubmit={this._onSubmit}
                titleKey={this._getDialogTitle()}
                width={'small'}>
                {this._getDialogContent()}
            </Dialog>
        )
    }

}

export default translate(connect()(PlannedMeetingDialog))