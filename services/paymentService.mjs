import axios from 'axios'; // Puedes usar axios u otra biblioteca para hacer solicitudes HTTP

class PaymentService {
  constructor() {
    this.paymentGatewayUrl = process.env.PAYMENT_GATEWAY_URL; // URL del proveedor de pagos
    this.apiKey = process.env.PAYMENT_API_KEY; // Clave API del proveedor de pagos
  }

  // Método para iniciar un pago
  async initiatePayment(amount, currency, recipientAccount) {
    try {
      const response = await axios.post(`${this.paymentGatewayUrl}/payments`, {
        amount,
        currency,
        recipientAccount,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error('Payment initiation failed');
    }
  }

  // Método para verificar el estado del pago
  async checkPaymentStatus(paymentId) {
    try {
      const response = await axios.get(`${this.paymentGatewayUrl}/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error checking payment status:', error);
      throw new Error('Payment status check failed');
    }
  }
}

export default new PaymentService();
