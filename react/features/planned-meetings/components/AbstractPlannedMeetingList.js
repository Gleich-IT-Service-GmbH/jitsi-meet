import React from "react";
import type { Dispatch } from "redux";

import { appNavigate } from "../../app/actions";
import { AbstractPage, Container, Text } from "../../base/react";

type Props = {
    /**
     * Redux store dispatch.
     */
    dispatch: Dispatch<any>,

    /**
     * Translate function.
     */
    t: Function
};

export default class AbstractPlannedMeetingList<P: Props> extends AbstractPage<P> {
    constructor(props: P) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    _getRenderListEmptyComponent: () => React$Node;
    /**
     * Returns a list empty component if a custom one has to be rendered instead
     * of the default one in the {@link NavigateSectionList}.
     *
     * @private
     * @returns {React$Component}
     */
    _getRenderListEmptyComponent() {
        const { t } = this.props;
        const descriptionId = "planned-meeting-list-empty-description";

        return (
            <Container
                aria-describedby={descriptionId}
                aria-label={t("welcomepage.plannedMeetings")}
                className="meetings-list-empty"
                role="region">
                <Text
                    className="description"
                    id={descriptionId}>
                    {t("welcomepage.plannedMeetingsEmtpy")}
                </Text>
            </Container>
        );
    }

    /**
     * Handles the list's navigate action.
     * 
     * @private
     * @param {string} url - The url string to navigate to.
     * @returns {void}
     */
    _onPress(url) {
        const { dispatch } = this.props;

        dispatch(appNavigate(url));
    }
}
