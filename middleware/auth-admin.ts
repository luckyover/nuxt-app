export default defineNuxtRouteMiddleware((to) => {

    if (to.path === '/admin/login') {
        return;
    }

    // const user = useUser(); // Use composable to get user state
  
    // Check if the route is under `/admin` and the user is not logged in
    // if (to.path.startsWith('/admin') && !user.value) {
    //   // Redirect to the login page if the user is not authenticated
    //   return navigateTo(`auth/login?redirect=${to.fullPath}`);
    // }
     return navigateTo(`/admin/login`);
});