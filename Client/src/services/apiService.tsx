import axios, { AxiosResponse } from 'axios';

export const apiCall = async (): Promise<void> => {
  try {
    const response: AxiosResponse<any> = await axios.get('http://localhost:3000');
    console.log('Response:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError specifically
      console.error('API call error:', error.message);
    } else {
      // Handle non-AxiosError (e.g., unexpected errors)
      console.error('Unexpected error:', error);
    }
  }
};
