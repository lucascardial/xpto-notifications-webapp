import { UiErrorType } from "./UiErrorType";

interface UiErrorEventMap {
  'error-ui': CustomEvent<UiErrorType>;
}

declare global {
  interface WindowEventMap extends UiErrorEventMap {}
}

type UiErrorListener = (error: UiErrorType) => void;

// dispatch new custom event
export const dispatchErrorUiEvent = (error: UiErrorType) => {
  const event = new CustomEvent('error-ui', { detail: error });
  window.dispatchEvent(event);
}

// listen to custom event
export const onErrorUiEvent = (callback: (error: UiErrorType) => void) => { 
  const listener = (event: CustomEvent) => callback(event.detail);
  window.addEventListener('error-ui', listener);

  return () => window.removeEventListener('error-ui', listener);
}


// const event = new CustomEvent('error-ui', { detail: {
//   htmlContent: '<h1>rsrsrs</h1>',
//   title: 'Custom Error Title',
//   message: 'CustomErrorMessage'
// } });
//   window.dispatchEvent(event);