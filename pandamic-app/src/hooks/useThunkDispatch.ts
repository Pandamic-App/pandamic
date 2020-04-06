import store from "../store";
import { useDispatch } from "react-redux";

const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
export default useThunkDispatch;
