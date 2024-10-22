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
  id:String 
  name:String 
  seo_title:String 
  slug:String 
  created_at:String 
  updated_at:String 

}