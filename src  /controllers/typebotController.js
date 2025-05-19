const axios = require('axios');
const config = require('../config');
const WhatsAppService = require('../services/whatsapp');

exports.startFlow = async (req, res) => {
  try {
    const { instanceId, number, flowId } = req.body;
    const response = await axios.post('https://api.typebot.io/v1/start', {
      flowId,
      phoneNumber: number,
    }, {
      headers: { Authorization: `Bearer ${config.typebotApiKey}` },
    });
    await WhatsAppService.sendMessage(instanceId, number, response.data.message);
    res.json({ status: 'success', message: 'Fluxo Typebot iniciado' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
