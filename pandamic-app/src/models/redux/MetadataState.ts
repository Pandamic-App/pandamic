import LatLong from "../LatLong";

interface MetadataState {
	loaded:boolean,
	hasAccount: boolean,
	accountId?:string,
	baseLocation?:LatLong
}

export default MetadataState;
