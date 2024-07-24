import Transaction from '../models/Transaction.js';
import Ad from '../models/Ad.js';

export const createTransaction = async (req, res) => {
  const { adId, buyerId, sellerId, amount, price } = req.body;

  try {
    const newTransaction = await Transaction.create({
      adId,
      buyerId,
      sellerId,
      amount,
      price,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

export const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
};

export const updateTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    transaction.status = status;
    await transaction.save();

    if (status === 'completed') {
        // Cambiar el estado del anuncio a "completed"
        const ad = await Ad.findByPk(transaction.adId);
        if (ad) {
          ad.status = 'completed';
          await ad.save();
        }
      }

    res.json(transaction);
  } catch (error) {
    console.error('Error updating transaction status:', error);
    res.status(500).json({ error: 'Failed to update transaction status' });
  }
};
