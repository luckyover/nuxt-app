// middleware/check-device.ts
import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useAppStore } from '@/stores/app';

export default defineNuxtRouteMiddleware((to, from) => {
    
    const appStore = useAppStore();
    // Function to detect the device type and model
    if (process.client) {
        const userAgent = navigator.userAgent;

        // Check for iPad
        const isIpad = /iPad/.test(userAgent);
        // Check for mobile devices (excluding iPad)
        const isMobile = /Mobi|Android/i.test(userAgent) && !isIpad;
        // Check for PC (not mobile and not iPad)
        const isPC = !isMobile && !isIpad;

        let deviceInfo: string;

        if (isMobile) {
            deviceInfo = 'mobile';
        } else if (isIpad) {
            deviceInfo = 'ipad';
        } else if (isPC) {
            deviceInfo = 'pc';
        } else {
            deviceInfo = '';
        }
        console.log(deviceInfo);
        
        // Save the device info in the Pinia store
        appStore.setDeviceInfo(deviceInfo);
    }
   
});
