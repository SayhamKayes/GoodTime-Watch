import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import {
  isNeonConfigured,
  getProducts,
  saveProduct,
  deleteProduct,
  getUpcoming,
  saveUpcoming,
  deleteUpcoming,
  getDelivered,
  saveDelivered,
  deleteDelivered,
  getBrands,
  saveBrands,
  getSiteSettings,
  saveSiteSettings
} from './server/api';

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const parseBody = (): Promise<any> => {
          return new Promise((resolve) => {
            let data = '';
            req.on('data', (chunk) => {
              data += chunk;
            });
            req.on('end', () => {
              try {
                resolve(JSON.parse(data));
              } catch {
                resolve({});
              }
            });
          });
        };

        const sendJson = (statusCode: number, payload: any) => {
          res.statusCode = statusCode;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(payload));
        };

        try {
          const url = new URL(req.url, 'http://localhost:3000');
          const pathname = url.pathname;

          if (pathname === '/api/health') {
            return sendJson(200, {
              status: 'ok',
              neonConnected: isNeonConfigured(),
              timestamp: new Date().toISOString()
            });
          }

          if (pathname === '/api/products') {
            if (req.method === 'GET') {
              const prods = await getProducts();
              return sendJson(200, prods);
            }
            if (req.method === 'POST') {
              const body = await parseBody();
              await saveProduct(body);
              return sendJson(200, { success: true });
            }
          }

          if (pathname.startsWith('/api/products/') && req.method === 'DELETE') {
            const id = pathname.replace('/api/products/', '');
            await deleteProduct(id);
            return sendJson(200, { success: true });
          }

          if (pathname === '/api/upcoming') {
            if (req.method === 'GET') {
              const upcoming = await getUpcoming();
              return sendJson(200, upcoming);
            }
            if (req.method === 'POST') {
              const body = await parseBody();
              await saveUpcoming(body);
              return sendJson(200, { success: true });
            }
          }

          if (pathname.startsWith('/api/upcoming/') && req.method === 'DELETE') {
            const id = pathname.replace('/api/upcoming/', '');
            await deleteUpcoming(id);
            return sendJson(200, { success: true });
          }

          if (pathname === '/api/delivered') {
            if (req.method === 'GET') {
              const delivered = await getDelivered();
              return sendJson(200, delivered);
            }
            if (req.method === 'POST') {
              const body = await parseBody();
              await saveDelivered(body);
              return sendJson(200, { success: true });
            }
          }

          if (pathname.startsWith('/api/delivered/') && req.method === 'DELETE') {
            const id = pathname.replace('/api/delivered/', '');
            await deleteDelivered(id);
            return sendJson(200, { success: true });
          }

          if (pathname === '/api/brands') {
            if (req.method === 'GET') {
              const brands = await getBrands();
              return sendJson(200, brands);
            }
            if (req.method === 'POST') {
              const body = await parseBody();
              await saveBrands(body);
              return sendJson(200, { success: true });
            }
          }

          if (pathname === '/api/site-info') {
            if (req.method === 'GET') {
              const info = await getSiteSettings();
              return sendJson(200, info);
            }
            if (req.method === 'POST') {
              const body = await parseBody();
              await saveSiteSettings(body);
              return sendJson(200, { success: true });
            }
          }

          sendJson(404, { error: 'Endpoint not found' });
        } catch (e: any) {
          sendJson(500, { error: e.message });
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: ['**/public/**/*.mp4', '**/public/**/*.webm', '**/public/**/*.mov'],
      },
    },
  };
});
