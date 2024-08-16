import express from 'express';
import dotenv from 'dotenv';
import adRoutes from './routes/adRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import sequelize from './config/database.js';  // Asegúrate de incluir la extensión del archivo

dotenv.config();

const app = express();

app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Connection to MySQL has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
  // Rutas de anuncios
  app.use('/api/ads', adRoutes);
  
  // Rutas de transacciones
  app.use('/api/transactions', transactionRoutes);

  app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
