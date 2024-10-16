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
  errors: Record<string, string[]>;
  device?:String | undefined
  isOpenVertical:boolean
  isLoading:boolean
  isLoadingModal:boolean
}


export interface Toast {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error'; // Define possible toast types
  duration:number;
}

export interface IDataTable {
  data: any[];  // You can replace 'any' with a specific type if you have one
  total: number;
  pageSize: number;
  current_page: number;
}