
export default abstract class StringsUtils
{
	private static source:{[key:string]:string} = require("../../assets/strings/hun.json")

	public static getString(key:string) : string|undefined
	{
		return this.source[key];
	}
}
