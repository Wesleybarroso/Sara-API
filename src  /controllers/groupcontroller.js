const WhatsAppService = require('../services/whatsapp');

exports.create = async (req, res) => {
  try {
    const { instanceId, groupName, participants } = req.body;
    const sock = await WhatsAppService.getSocket(instanceId);
    const group = await sock.groupCreate(groupName, participants.map(p => `${p}@s.whatsapp.net`));
    res.json({ status: 'success', groupId: group.id });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { instanceId, groupId, number } = req.body;
    const sock = await WhatsAppService.getSocket(instanceId);
    await sock.groupParticipantsUpdate(groupId, [`${number}@s.whatsapp.net`], 'add');
    res.json({ status: 'success', message: 'Membro adicionado' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
