import memoizeOne from "memoize-one";
import moment from "moment";
import LatLong from "../models/LatLong";

export function countDictElements(dict:{[key:string]:number}) : number
{
	let all = 0;
	for (let kk in dict)
	{
		if (dict.hasOwnProperty(kk))
		{
			all += dict[kk]
		}
	}
	return all;
}

export function getHowLongAgoString(date:Date) : string
{
	let mm = moment(date);
	let sinces = [{from:"minutes",sign:"m"},{from:"hours",sign:"h"},{from:"days",sign:"d"}];
	let difTo = moment(new Date());

	let res = "0 m";

	for (let el of sinces)
	{
		let ago = difTo.diff(mm,el.from as any);
		if (ago >= 1)
		{
			res = `${ago} ${el.sign}`;
		}
	}
	return res;

}

export function makeRandomId(length:number):string
{
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++)
	{
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
