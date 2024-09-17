import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {musicActions} from "../store/slice/music.slice.ts";

const allActions = {
    ...musicActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch)
}