// composables/useUser.ts
export const useUser = () => {
    const user = useState('user', () => null);
    const token = useState<string | null>('token', () => null);
  
    // Hàm khôi phục token từ localStorage khi trang được tải lại
    const loadToken = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        token.value = storedToken;
        // Thực hiện yêu cầu đến API nếu cần để xác thực token và lấy thông tin người dùng
      }
    };
  
    // Gọi loadToken khi trang được tải
    if (process.client && !token.value) {
      loadToken();
    }
  
    const login = (userData: any, userToken: string) => {
      user.value = userData;
      token.value = userToken;
      localStorage.setItem('token', userToken);
    };
  
    const logout = () => {
      user.value = null;
      token.value = null;
      localStorage.removeItem('token');
    };
  
    const isLoggedIn = () => !!token.value;
  
    return {
      user,
      token,
      login,
      logout,
      isLoggedIn,
    };
  };
  