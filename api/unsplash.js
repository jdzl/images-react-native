import axios from 'axios';
import { UNSPLASH_CLIENT_ID } from 'react-native-dotenv'

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization:
      `Client-ID ${UNSPLASH_CLIENT_ID}`
  }
});
