import Ad from '../models/Ad.js';
import CryptoService from '../services/cryptoService.js';

export const createAd = async (req, res) => {
  const { userId, type, cryptocurrency, amount, price, userWalletAddress } = req.body;

  try {
    const newAd = await Ad.create({
      userId,
      type,
      cryptocurrency,
      amount,
      price,
    });

    if (type === 'sell') {
      await CryptoService.lockCryptocurrency(newAd.id, cryptocurrency, amount, userWalletAddress);
    }

    res.status(201).json(newAd);
  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({ error: 'Failed to create ad' });
  }
};

export const getAds = async (req, res) => {
  try {
    const ads = await Ad.findAll();
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ error: 'Failed to fetch ads' });
  }
};

export const getAdById = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await Ad.findByPk(id);
    if (!ad) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    console.error('Error fetching ad:', error);
    res.status(500).json({ error: 'Failed to fetch ad' });
  }
};

export const deleteAd = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Ad.destroy({ where: { id } });
    if (result === 0) {
      return res.status(404).json({ error: 'Ad not found' });
    }
    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error);
    res.status(500).json({ error: 'Failed to delete ad' });
  }
};
