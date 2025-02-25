import { type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config: UserConfig = {
  plugins: [react()],
  server: {
    host: true,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
      host: 'localhost'
    }
  }
};

export default config;
