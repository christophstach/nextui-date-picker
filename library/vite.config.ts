import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'NextUIDatePicker',
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@nextui-org/react', 'use-liluis'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@nextui-org/react': 'NextUI',
          'use-lilius': 'use-lilius',
          'date-fns': 'date-fns',
        },
      },
    },
  },
});
