import { defineStore } from 'pinia'
import type { IMessage ,IAppState} from '@/types/app'

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
   
  },
 
})
