// @flow

import React from 'react';

import AbstractPollsPane from '../AbstractPollsPane';
import type { AbstractProps } from '../AbstractPollsPane';

import PollsList from './PollsList';

import { PollCreate } from '.';
import { useSelector } from 'react-redux';

const PollsPane = (props: AbstractProps) => {

    const { createMode, onCreate, setCreateMode, t } = props;
    const jwt = useSelector(state => state['features/base/jwt']?.jwt);

    const showPollResult = () => {
        return (
        <div className = { 'poll-container' } >
            <PollsList />
        </div>
        )
    }

    const renderPoll = () => {
        if (jwt) {
            return (
                createMode
                ? <PollCreate setCreateMode = { setCreateMode } />
                : (
                    <div className = 'polls-pane-content'>
                        {showPollResult()}
                        <div className = 'poll-footer poll-create-footer'>
                            <button
                                aria-label = { t('polls.create.create') }
                                className = 'poll-button poll-button-primary'
                                // eslint-disable-next-line react/jsx-no-bind
                                onClick = { onCreate } >
                                <span>{t('polls.create.create')}</span>
                            </button>
                        </div>
                    </div>
                )
            )
        } else {
            return (
                <div className = 'polls-pane-content'>
                    {showPollResult()}
                </div>
            )
        }
    }

    console.log(jwt)

    return renderPoll()
};

/*
 * We apply AbstractPollsPane to fill in the AbstractProps common
 * to both the web and native implementations.
 */
// eslint-disable-next-line new-cap
export default AbstractPollsPane(PollsPane);
