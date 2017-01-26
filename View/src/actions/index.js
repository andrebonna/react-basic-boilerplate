import {TOGGLE_BOOLEAN, CHANGE_TEXT} from '../constants/types';

export const toggleBoolean = () => {

    return (dispatch) => {
        setTimeout(()=> {
            dispatch({type: TOGGLE_BOOLEAN});
        }, 1000);

    };
};

export const changeText = (text) => {
    return (dispatch) => {
        dispatch({type: CHANGE_TEXT, value: text});
    };
};
