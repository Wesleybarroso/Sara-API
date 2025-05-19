const WhatsAppService = require('../services/whatsapp');
const CloudinaryService = require('../services/cloudinary');

exports.send = async (req, res) => {
  try {
    const { instanceId, number, message, type = 'text' } = req.body;
    let mediaUrl = req.body.mediaUrl;
    if (req.file) {
      mediaUrl = await CloudinaryService.uploadFile(req.file);
    }
    await WhatsAppService.sendMessage(instanceId, number, message, type, mediaUrl);
    res.json({ status: 'success', message: 'Mensagem enviada' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.webhook = async (req, res) => {
  try {
    const { event, instanceId, from, content, type } = req.body;
    console.log('Webhook recebido:', req.body);

    if (event === 'message_received') {
      res.json({ status: 'success', message: 'Evento recebido' });
    } else {
      res.json({ status: 'success', message: 'Evento desconhecido' });
    }
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
