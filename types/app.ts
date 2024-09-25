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
 
}
export interface Toast {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error'; // Define possible toast types
}