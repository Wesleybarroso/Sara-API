const Automation = require('../models/automation');

exports.create = async (req, res) => {
  try {
    const { instanceId, name, trigger, conditions, actions } = req.body;
    const automation = new Automation({
      instanceId,
      name,
      trigger,
      conditions: conditions || [],
      actions,
    });
    await automation.save();
    res.json({ status: 'success', message: 'Automação criada' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const { instanceId } = req.params;
    const automations = await Automation.find({ instanceId });
    res.json({ status: 'success', data: automations });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};
