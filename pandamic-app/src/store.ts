import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from "redux-thunk";
import PersistState from "./utils/PersistState";
import GameState from "./models/redux/GameState";

const store = createStore(rootReducer as any, undefined, applyMiddleware(thunkMiddleware))
var CallCounter =0;

store.subscribe(()=>{
	CallCounter++;

	if (CallCounter % 5 == 0)
	{
		CallCounter = 0;

		PersistState.saveState(store.getState() as GameState);
	}
})

export default store;
