import {TypedUseSelectorHook, useSelector} from "react-redux";
import {TypeRootState} from "../store/store.ts";

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector