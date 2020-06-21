import LatLong from "../LatLong";

interface MetadataState {
	loaded:boolean,
	hasAccount: boolean,
	accountId?:string,
	baseLocation?:LatLong,

	infoScreenOpen:boolean,
	otherError?:string
}

export default MetadataState;

export function getDefaultMetadataState(): MetadataState
{
	return ({
		hasAccount: false,
		loaded: false,
		infoScreenOpen: false
	});
}
