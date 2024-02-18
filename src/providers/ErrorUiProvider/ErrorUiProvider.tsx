'use client';

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UiErrorType } from "./UiErrorType";
import { onErrorUiEvent } from "./Event";


const DefaultErrorDialog = (error: UiErrorType) => (
  <>
    <DialogTitle id="alert-dialog-title">
          {error.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error.message}
          </DialogContentText>
        </DialogContent>
  </>
);
const ServerHtmlErrorDialog = (error: UiErrorType) => (
  <>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div dangerouslySetInnerHTML={{__html: error.htmlContent || ''}} />
          </DialogContentText>
        </DialogContent>
  </>
);

export const ErrorUiProvider = () => {
  const [errors, setErrors] = useState<UiErrorType[]>([]);

  const handleClose = () => {
    setErrors(errorsState => errorsState.filter((_, index) => index !== 0));
  }

  useEffect(() => {
    const unSub = onErrorUiEvent((uiError) => {
      setErrors(errorsState => [...errorsState, uiError])
    })

    return () => unSub();
  }, []);


  return <Dialog open={errors.length > 0} onClose={handleClose}>
      <Box sx={{ width: '600px'}}>
        {errors[0]?.htmlContent ? <ServerHtmlErrorDialog {...errors[0]} /> : <DefaultErrorDialog {...errors[0]} />}
      <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Box>
  </Dialog>
};