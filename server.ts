import express from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    neonConnected: isNeonConfigured(),
    timestamp: new Date().toISOString()
  });
});

// Products API
app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    await saveProduct(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Upcoming Watches API
app.get('/api/upcoming', async (req, res) => {
  try {
    const upcoming = await getUpcoming();
    res.json(upcoming);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/upcoming', async (req, res) => {
  try {
    await saveUpcoming(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/upcoming/:id', async (req, res) => {
  try {
    await deleteUpcoming(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Delivered Watches API
app.get('/api/delivered', async (req, res) => {
  try {
    const delivered = await getDelivered();
    res.json(delivered);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/delivered', async (req, res) => {
  try {
    await saveDelivered(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/delivered/:id', async (req, res) => {
  try {
    await deleteDelivered(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Brands API
app.get('/api/brands', async (req, res) => {
  try {
    const brands = await getBrands();
    res.json(brands);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/brands', async (req, res) => {
  try {
    await saveBrands(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Site Settings / Contact Numbers API
app.get('/api/site-info', async (req, res) => {
  try {
    const info = await getSiteSettings();
    res.json(info);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/site-info', async (req, res) => {
  try {
    await saveSiteSettings(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static frontend if in production
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Neon Database status: ${isNeonConfigured() ? 'CONFIGURED ✅' : 'NOT CONFIGURED (Using local fallback) ⚠️'}`);
});
