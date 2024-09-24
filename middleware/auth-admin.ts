export default defineNuxtRouteMiddleware((to) => {

    if (to.path === '/admin/login') {
        return;
    }

    // const user = useUser(); // Use composable to get user state
  
    // Check if the route is under `/admin` and the user is not logged in
    if (to.path.startsWith('/admin')) {
        return navigateTo(`/admin/login`);
    }
     
});