import { FieldTextStateless as TextField } from '@atlaskit/field-text';
import React, { useState } from "react";

import { Dialog } from '../../../../base/dialog'
import { translate } from "../../../../base/i18n";
import { setJWT } from '../../../../base/jwt';
import { connect } from "../../../../base/redux";
import { hideDialog } from "../../../../base/dialog/actions"
import { addPlannedMeetingEntry } from '../../../../planned-meetings/actions';

/**
 * The type of {@link LoginDialog}'s React {@code Component} props.
 */
type Props = {
    /**
     * Login Handler.
     */
    onLogin: Function,

    /**
     * External state for connecting.
     */
    connecting: Boolean,

    /**
     * Flag for running onLogin function on successful login.
     */
    runAfterSuccess: Boolean,

    /**
     * Function to be used to translate i18n labels.
     */
    t: Function,

    dispatch: Function
}

/**
 * Implements the Login dialog.
 *
 * @param {Object} props - The props of the component.
 * @returns {React$Element}.
 */
function LoginDialog(props: Props) {
    const { connecting, t, dispatch } = props;

    const [loginStarted, setLoginStarted] = useState(false)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const _onLogin = (ev: SubmitEvent) => {
        const { onLogin, runAfterSuccess } = props

        if (onLogin && !runAfterSuccess) {
            onLogin();

            return;
        }

        setLoginStarted(true)
        fetch('/token', {
            body: JSON.stringify({
                email: username,
                password: password
            }),
            method: 'POST',
            mode: 'cors'
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error('Failed to fetch credentials');
                }
            })
            .then((json) => {
                const jwt = json.data;

                dispatch(setJWT(jwt))

                fetch('/token/meeting', {
                    mode: 'cors',
                    method: 'POST',
                    body: JSON.stringify({ jwt: jwt })
                })
                    .then((resp) => {
                        if (resp.ok)
                            return resp.json();

                        throw new Error(resp.statusText);
                    })
                    .then(json => {
                        /** @type Array<import('../../../../planned-meetings/interfaces').PlannedMeetingEntry> */
                        const listMeetings = json.data;
                        if (listMeetings) {
                            for (const meeting of listMeetings) {
                                const entry = {
                                    guid: meeting.guid,
                                    title: meeting.title,
                                    date: parseInt(meeting.date)
                                };

                                dispatch(addPlannedMeetingEntry(entry));
                            }
                        }
                    }).
                    catch(error => {
                        console.error(error);
                    });

                const component = APP.store.getState()["features/base/dialog"].component
                dispatch(hideDialog(component))

                if (runAfterSuccess) {
                    onLogin();
                }
            })
            .catch((error: Error) => {
                console.error(error)
            })
            .finally(() => {
                setLoginStarted(false)
            });
    }

    const _onChange = (ev: Event) => {
        switch (ev.target.name) {
            case 'username':
                setUsername(ev.target.value);
                break;
            case 'password':
                setPassword(ev.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <Dialog
            disableBlanketClickDismiss={loginStarted}
            hideCancelButton={loginStarted}
            okDisabled={
                connecting
                || loginStarted
                || !password
                || !username
            }
            okKey={t('dialog.login')}
            onSubmit={_onLogin}
            titleKey={'Login'}
            width={'small'}>
            <TextField
                autoFocus={true}
                className='input-control'
                compact={false}
                label={t('dialog.user')}
                name='username'
                placeholder={t('dialog.userIdentifier')}
                shouldFitContainer={true}
                type='text'
                onChange={_onChange}
                value={username} />
            <TextField
                className='input-control'
                compact={false}
                label={t('dialog.userPassword')}
                name='password'
                placeholder={t('dialog.password')}
                shouldFitContainer={true}
                type='password'
                onChange={_onChange}
                value={password} />
        </Dialog>
    )
}

export default translate(connect()(LoginDialog))