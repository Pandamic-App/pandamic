export interface PandaTask
{
	title:string,
	question:string,
	weight:number,
	yesIsGood?:boolean,
	requiresSteps?:number
}


export type DoingPandaTask  = PandaTask &
{
	id:string,
	startedAt:Date,
	atStepts?:number
}
