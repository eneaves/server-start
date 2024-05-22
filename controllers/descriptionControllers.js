const descriptionModel = require('../models/descriptionModel');
async function getDescriptionById(req, res) {
  const { id } = req.params;
  try {
    const description = await descriptionModel.getDescriptionById(id);
    res.status(200).json(description);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { getDescriptionById };
