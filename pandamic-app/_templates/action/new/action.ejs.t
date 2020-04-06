---
to: src/actions/<%= name %>.ts
---
import { createAction } from "redux-actions";

export const <%= name %> = createAction<<%= h.inflection.camelize(name,false) %>Action>("<%= name %>");
export interface <%= h.inflection.camelize(name,false) %>Action
{

}
