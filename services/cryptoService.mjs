import axios from 'axios';

class CryptoService {
  constructor() {
    this.cryptoApiUrl = process.env.CRYPTO_API_URL;
    this.apiKey = process.env.CRYPTO_API_KEY;
  }

  async getCryptoPrice(cryptoSymbol) {
    try {
      const response = await axios.get(`${this.cryptoApiUrl}/price`, {
        params: { symbol: cryptoSymbol },
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.data.price;
    } catch (error) {
      console.error('Error fetching crypto price:', error);
      throw new Error('Failed to fetch crypto price');
    }
  }

  async generateWalletAddress(userId) {
    try {
      const response = await axios.post(`${this.cryptoApiUrl}/wallets`, { userId }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.data.address;
    } catch (error) {
      console.error('Error generating wallet address:', error);
      throw new Error('Failed to generate wallet address');
    }
  }

  // Método para bloquear criptomonedas en un sistema de custodia (escrow)
  async lockCryptocurrency(adId, cryptoSymbol, amount, userWalletAddress) {
    try {
      const response = await axios.post(`${this.cryptoApiUrl}/escrow/lock`, {
        adId,
        cryptoSymbol,
        amount,
        userWalletAddress,
      }, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error locking cryptocurrency:', error);
      throw new Error('Failed to lock cryptocurrency');
    }
  }
}

export default new CryptoService();
