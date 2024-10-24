import { defineStore } from 'pinia'
import type { IMessage ,IAppState,Toast} from '@/types/app'

const defaultMessage:IMessage= {
  type: '',
  title: '',
  content: '',
  okText: '',
  cancelText: '',
  callback: undefined,
}

export const useAppStore = defineStore('app', {
  state: ():IAppState => {
    return {
      isShowMessage: false,
      message: { ...defaultMessage },
      toasts:[] as Toast[],
      errors:{},
      device:'',
      isOpenVertical:false,
      isLoading: false,
      isLoadingModal: false,
    }
  },
  actions: {
    showMessage(message: Partial<IMessage>) {
      this.message = {
        ...defaultMessage,
        ...message
      }
      this.isShowMessage = true
    },
    hideMessage() {
      this.isShowMessage = false
      this.message = {
        ...defaultMessage
      }
    },
    exeCallback(ok: boolean) {
      if (typeof this.message.callback === 'function') {
        this.message.callback(ok);
      }
      this.hideMessage(); 
    },
    // Toast

    showToast(message: Toast) {
      this.toasts.push(message);
      console.log(message);
      
      setTimeout(() => {
        this.removeToast(this.toasts.length - 1); // Remove the last toast added
      }, message.duration);

    },
    removeToast (index:number){
      this.toasts.splice(index, 1); // Remove the toast at the given index
    },
    //message error
    addError(error:Record<string, string[]>){
    
      this.errors = {
        ...error
      }
    },
    clearError(){
      this.errors = {}
    },
    //device
    setDeviceInfo(info: string | undefined) {
      this.device = info;
    },

    //isOpenVertical
    setOpenVertical(isOpen : boolean){
      this.isOpenVertical = isOpen;
    },
    //loading
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
    loadingModal(){
      this.isLoadingModal = true;
    },
    loadingScreen(){
      this.isLoadingModal = false;
    }

  },
 
})
