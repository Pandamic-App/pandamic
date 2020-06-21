import MetadataState, { getDefaultMetadataState } from "./MetadataState";
import TaskState, { getDefaultTaskState } from "./TaskState";
export default interface GameState
{
	metadataState:MetadataState,
	taskState:TaskState
}

export function getTestingGameState() : GameState
{
	return {
		metadataState:{
			loaded:true,
			hasAccount:false,
			infoScreenOpen:false,
			/*
			baseLocation: {
				"lat": 47.5179137,
				"lng": 19.1219517,
			},
			accountId:"1"*/
		},
		taskState: getDefaultTaskState()
	}
}

export function getDefaultGameState(): GameState
{
	return {
		metadataState: getDefaultMetadataState(),
		taskState: getDefaultTaskState()
	}
}
