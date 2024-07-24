import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Ad = sequelize.define('Ad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nombre de la tabla referenciada
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('buy', 'sell'), // Tipo de anuncio: compra o venta
    allowNull: false,
  },
  cryptocurrency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(18, 8),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'cancelled'),
    defaultValue: 'active',
  },
}, {
  timestamps: true, // Añade campos createdAt y updatedAt
});

export default Ad;
