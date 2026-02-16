const https = require('https');

class WhatsAppService {
    constructor() {
        this.phoneNumber = process.env.WHATSAPP_PHONE_NUMBER;
        this.messageTemplate = process.env.WHATSAPP_MESSAGE_TEMPLATE;
    }

    async sendOrderMessage(order) {
        try {
            // Format products for WhatsApp message
            const productsList = order.items.map((item, index) => {
                return `${index + 1}. ${item.name} (${item.brand})\n   Size: ${item.size} | Qty: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}`;
            }).join('\n\n');

            // Format the complete message
            const message = this.messageTemplate
                .replace('{name}', order.shippingAddress.name)
                .replace('{phone}', order.shippingAddress.phone)
                .replace('{products}', productsList)
                .replace('{total}', order.totalPrice.toFixed(2));

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${this.phoneNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;

            // For development, return the URL instead of actually sending
            if (process.env.NODE_ENV === 'development') {
                console.log('WhatsApp Order URL:', whatsappUrl);
                console.log('WhatsApp Message:', message);
                return { success: true, url: whatsappUrl, message };
            }

            // In production, you might want to use WhatsApp Business API
            // For now, we'll return the URL that can be opened
            return { success: true, url: whatsappUrl, message };

        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
            return { success: false, error: error.message };
        }
    }

    // Alternative method using WhatsApp Business API (requires setup)
    async sendWhatsAppBusinessAPI(phoneNumber, message) {
        try {
            // This would require WhatsApp Business API setup
            // For now, this is a placeholder
            const data = {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'text',
                text: {
                    body: message
                }
            };

            // Implementation would go here
            console.log('WhatsApp Business API would send:', data);
            return { success: true };
        } catch (error) {
            console.error('Error with WhatsApp Business API:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new WhatsAppService();
