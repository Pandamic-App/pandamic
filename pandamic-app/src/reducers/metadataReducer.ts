import { handleAction, handleActions } from "redux-actions";
import { Payload } from "../models/redux/Payload";
import MetadataState from "../models/redux/MetadataState";
import { CreateAccountAction, createAccount } from "../actions";

export function getDefaultMetadataState(): MetadataState
{
	return ({
		hasAccount:false,
		loaded:false,
	});
}

const metadataReducer = handleActions<MetadataState, Payload>(
	{

		[createAccount.toString()]: (state, action) =>
		{
			const payload = action.payload as CreateAccountAction;
			let newState = Object.assign({}, state);
			newState.hasAccount = true;
			newState.loaded = true;
			newState.baseLocation = payload.home;

			return {...newState}
		}
		/*
		[loadSavedUserView.toString()]: (state, _payload) =>
		{
			const payload = _payload.payload as LoadSavedUserViewAction;
			const isViewValid = UserUtil.isUserViewValid(payload.userView);
			return {
				...state,
				authState: isViewValid ? "authed" : "unauthed",
				userView: payload.userView
			};
		},
		[loginUserView.toString()]: (state, _payload) =>
		{
			const payload = _payload.payload as LoginUserViewAction;
			const isViewValid = UserUtil.isUserViewValid(payload.newUserView);
			return {
				...state,
				userView: payload.newUserView,
				loginError: payload.errorMessage,
				authState: isViewValid ? "authed" : "unauthed"
			}
		}*/
	},
	getDefaultMetadataState()
);

export default metadataReducer
