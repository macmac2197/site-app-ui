import { MODAL_ACTIONS_TYPE } from '../actions/modalActions';

const IModalPropsState = {
    isModalOpen: false,
    title: '',
    description: '',
    variant: '',
    confirmBtnText: '',
    cancelBtnText: ''
}

export const modalReducer = (state = IModalPropsState, action) => {
    switch (action.type) {
        case MODAL_ACTIONS_TYPE.TOGGLE_MODAL:
            return {
                ...state,
                isModalOpen: action.payload
            }
        case MODAL_ACTIONS_TYPE.SET_PROPS:
            const {
                title, description, variant, confirmBtnText, cancelBtnText, callback,
              } = action.payload;
            return {
                ...state,
                title,
                description,
                variant,
                confirmBtnText,
                cancelBtnText,
                callback,
            }
        default:
            return state;
    }
}