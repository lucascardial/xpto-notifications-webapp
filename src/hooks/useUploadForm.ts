import axios, { Axios, AxiosProgressEvent, AxiosResponse } from "axios";
import { useState } from "react";

export const useUploadForm = (axiosClient: Axios) => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const uploadForm = async (url: string, formData: FormData): Promise<AxiosResponse> => {
    setIsUploading(true);
    return await axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        const percentCompleted = (progressEvent.progress || 0) * 100;
        setProgress(parseFloat(percentCompleted.toFixed(2)));
      },
    }).finally(() => {
      setIsUploading(false);
    });
  }

  return { progress, uploadForm, isUploading }
}