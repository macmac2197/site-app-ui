export const MODAL_ACTIONS_TYPE = {
    TOGGLE_MODAL: 'TOGGLE_MODAL',
    SET_PROPS: 'SET_PROPS'
}

export const toggleModal = (value) => {
    return {
        type: MODAL_ACTIONS_TYPE.TOGGLE_MODAL,
        payload: value
    }
}

export const setModalProps = (title, description, variant, confirmBtnText, cancelBtnText, callback) => {
    return {
        type: MODAL_ACTIONS_TYPE.SET_PROPS,
        payload: {
            title,
            description,
            variant,
            confirmBtnText,
            cancelBtnText,
            callback
        }
    }
}