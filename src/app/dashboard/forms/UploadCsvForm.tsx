'use client'
import { Backdrop, Box, Button, CircularProgress, LinearProgress, Typography } from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
import { FormEventHandler, useState } from "react";
import { useUploadForm } from "@/hooks/useUploadForm";
import { ApiClient } from "@/http-clients/ApiAxiosClient";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FormState {
  file: File | null;
}

export default function UploadCsvForm() {
  const [formState, setFormState] = useState<FormState>({
    file: null,
  });

  const { progress, uploadForm, isUploading } = useUploadForm(ApiClient);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const fileName = file.name;
    const fileExtension = fileName.split('.').pop();

    
    if (!fileExtension || fileExtension !== 'csv') {
      alert(`Extensão do arquivo inválida. Apenas arquivos .csv são permitidos.`);
      return;
    }

    const formData = new FormData();
    formData.append('attachment', file as Blob);

    await uploadForm('/v1/contacts/upload-csv', formData);
  }

  const handleSubmit = async () => {
    
  }

  return (
    <Box>
      <form id="upload-csv-form" onSubmit={handleSubmit}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          >
          Importar
          <VisuallyHiddenInput required type="file" onChange={handleFileChange}/>
        </Button>
      </form>
      {isUploading && (
        <Backdrop open>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress color="primary" value={progress} />
            <Typography sx={{ color: '#fff'}}>Enviando: {progress}%</Typography>
          </Box>
        </Backdrop>
      )}
    </Box>
  );
}