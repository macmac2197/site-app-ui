import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/actions/modalActions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDialog = () => {
    const dispatch =  useDispatch();
    const modalState =  useSelector((state) => state.modalState);

    const handelModalConfirm = async () => {
        if (modalState.callback) {
            modalState.callback();
        }
        dispatch(toggleModal(false));
    }

    const handleModalCancel = () => {
        dispatch(toggleModal(false));
    }

    return (
        <>
            <Dialog
                open={ modalState.isModalOpen }
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    { modalState.title }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        { modalState.description }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={handleModalCancel}
                    >
                        { modalState.cancelBtnText}
                    </Button>
                    <Button 
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={handelModalConfirm}
                    >
                        { modalState.confirmBtnText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ModalDialog;