import { useUser } from '@/composables/useUser';
export default defineNuxtRouteMiddleware((to) => {
    const user = useUser();
    if (to.path === '/admin/login') {
        return;
    }
    
    // Check if the route is under `/admin` and the user is not logged in
    if (to.path.startsWith('/admin')  && !user.isLoggedIn) {
        return navigateTo(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`);
    }
     
});