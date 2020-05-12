import LatLong from "../LatLong";

interface MetadataState {
	loaded:boolean,
	hasAccount: boolean,
	accountId?:string,
	baseLocation?:LatLong,

	infoScreenOpen:boolean
}

export default MetadataState;
