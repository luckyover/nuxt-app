export interface IMessage {
    type:  number | string
    title?:  string
    content?: string
    okText?: string
    cancelText?: string
    callback?: (ok?: boolean) => void;
  }


export interface IAppState {
 
  isShowMessage: boolean
  message: IMessage
  toasts:Toast[]
  errors:Object
}


export interface Toast {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error'; // Define possible toast types
  duration:number;
}