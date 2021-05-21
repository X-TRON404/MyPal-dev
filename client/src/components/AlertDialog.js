import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({text,openAlert,changeAlert}) {
  const handleClose = () => {
    changeAlert(false);
  };

  return (
    <div className="alertDialog">
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{text}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
                
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cool!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
