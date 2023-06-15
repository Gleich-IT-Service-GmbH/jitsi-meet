import { batch } from "react-redux";
import { HIDE_DIALOG, openDialog } from "../../../base/dialog";
import { i18next } from '../../../base/i18n';
import LoginDialog from "./components/LoginDialog";

declare var APP: Object;

/**
 * Opens {@code LoginDialog}.
 *
 * @param {Object} props - Props which should be used.
 *  enabled on click.
 * @returns {Function}
 */
export function openLoginDialog(props?: { onLogin: Function, runAfterSuccess: Boolean }) {
    return openDialog(LoginDialog, props);
}

/**
 * Signals Dialog to close its dialog.
 *
 * @param {Object} [component] - The {@code Dialog} component to close/hide. If
 * {@code undefined}, closes/hides {@code Dialog} regardless of which
 * component it's rendering; otherwise, closes/hides {@code Dialog} only if
 * it's rendering the specified {@code component}.
 * @returns {{
 *     type: HIDE_DIALOG,
 *     component: (React.Component | undefined)
 * }}
 */
export function hideDialog(component: ?Object) {
    return {
        type: HIDE_DIALOG,
        component
    }
}