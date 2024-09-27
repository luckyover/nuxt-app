import { useUser } from '@/composables/useUser';
export default defineNuxtRouteMiddleware((to) => {
    if (process.client) {
        const user = useUser();
        if (to.path === '/admin/login') {
            return;
        }
        console.log(user.isLoggedIn());
        
       // Check if the route is under `/admin` and the user is not logged in
        if (to.path.startsWith('/admin')  && !user.isLoggedIn()) {
            return navigateTo(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`);
        }
    }
 
     
});