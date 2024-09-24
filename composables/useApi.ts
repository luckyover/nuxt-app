// composables/useApi.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Thay đổi URL này thành API của bạn
  timeout: 10000, // Thời gian chờ cho yêu cầu
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useApi = () => {
  const get = async (url: string) => {
    try {
      const response = await apiClient.get(url);
      return response.data; // Trả về dữ liệu từ response
    } catch (error) {
      console.error('Error during GET request:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi
    }
  };

  const post = async (url: string, data: any) => {
    try {
      const response = await apiClient.post(url, data);
      console.log(response);
      
    //   return response.data;
    } catch (error) {
        console.log(error);
        
      //console.error('Error during POST request:', error);
    //  throw error;
    }
  };

  // Bạn có thể thêm các phương thức khác như PUT, DELETE nếu cần

  return {
    get,
    post,
  };
};
