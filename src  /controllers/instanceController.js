const WhatsAppService = require('../services/whatsapp');
const Instance = require('../models/instance');

exports.create = async (req, res) => {
  try {
    const { instanceId } = req.body;
    const existingInstance = await Instance.findOne({ instanceId });
    if (existingInstance) {
      return res.status(400).json({ status: 'error', message: 'Instância já existe' });
    }
    const instance = new Instance({ instanceId });
    await instance.save();
    await WhatsAppService.connect(instanceId);
    res.json({ status: 'success', message: 'Instância criada, escaneie o QR code' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const { instanceId } = req.params;
    const instance = await Instance.findOne({ instanceId });
    if (!instance) {
      return res.status(404).json({ status: 'error', message: 'Instância não encontrada' });
    }
    res.json({ status: 'success', data: instance });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { instanceId } = req.params;
    await Instance.deleteOne({ instanceId });
    if (WhatsAppService.sockets[instanceId]) {
      delete WhatsAppService.sockets[instanceId];
    }
    res.json({ status: 'success', message: 'Instância deletada' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
