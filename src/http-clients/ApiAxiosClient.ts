'use client'
import { dispatchErrorUiEvent } from "@/providers/ErrorUiProvider/Event";
import axios, { Axios } from "axios";

export const ApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

ApiClient.interceptors.response.use(
  response => response,
  error => {
    const data = error.response?.data;

    if(data?.extra?.ui_action === 'show_dialog_error') {
      const uiError = {
        title: data.title,
        message: data.detail,
        htmlContent: data.extra.html_content,
      };

      dispatchErrorUiEvent(uiError);

      return;
    }

    return Promise.reject(error);
  }
);
