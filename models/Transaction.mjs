import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Ads', // Nombre de la tabla referenciada
      key: 'id',
    },
  },
  buyerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sellerId: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true, // Añade campos createdAt y updatedAt
});

export default Transaction;
