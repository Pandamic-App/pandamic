export interface PandaTask
{
	title:string,
	question:string,
	weight:number,
	yesIsGood?:boolean,
	requiresSteps?:number,
	fromTime?:string,
	toTime?:string
}


export type DoingPandaTask  = PandaTask &
{
	id:string,
	startedAt:Date,
	atStepts?:number
}
