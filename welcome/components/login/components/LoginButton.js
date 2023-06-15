
import { translate } from "../../../../base/i18n";
import { IconUser, IconUserCrossed } from "../../../../base/icons";
import { setJWT } from "../../../../base/jwt";
import { connect } from "../../../../base/redux";
import { AbstractButton, type AbstractButtonProps } from "../../../../base/toolbox/components";
import { openLogoutDialog } from "../../../../settings";
import { hideDialog, openLoginDialog } from "../actions";

type Props = AbstractButtonProps & {
    dispatch: Function,
    isLoggedIn: Boolean,
    setLoginState: Function
}

class LoginButton extends AbstractButton<Props, any> {
    accessibilityLabel = 'Login';
    icon = IconUser;
    label = 'Login';
    tooltip = 'Login';

    constructor(props: Props) {
        super(props)

        this._switchIcons = this._switchIcons.bind(this);

        this._switchIcons(props.isLoggedIn)
    }

    _switchIcons(isLoggedIn: Boolean) {
        if(isLoggedIn) {
            this.accessibilityLabel = 'Logout';
            this.icon = IconUserCrossed;
            this.label = 'Logout';
            this.tooltip = 'Logout';
        } else {
            this.accessibilityLabel = 'Login';
            this.icon = IconUser;
            this.label = 'Login';
            this.tooltip = 'Login';
        }
    }

    _handleClick() {
        const {
            handleClick,
            dispatch,
            isLoggedIn,
            setLoginState
        } = this.props;

        if (handleClick) {
            handleClick();

            return;
        }

        this._switchIcons(!isLoggedIn);

        if (isLoggedIn) {
            const onLogout = (value) => {
                setLoginState(false)
                setJWT(undefined)

                dispatch(hideDialog(APP.store.getState()["features/base/dialog"].component))
            }

            dispatch(openLogoutDialog(onLogout))
        } else {
            const props = {
                onLogin: () => {
                    setLoginState(true);
                },
                runAfterSuccess: true
            };

            dispatch(openLoginDialog(props))
        }
    }
}

export default translate(connect()(LoginButton));