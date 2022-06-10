const { createHDI, deleteHDI } = require('../utility/instanceManager');

const handleHDICreation = async (tenantId, logger) => {
  const hdi = await createHDI(tenantId, logger);
  return hdi;
};
const handleHDIDeletion = async (tenantId, logger) => {
  const hdi = await deleteHDI(tenantId, logger);
  return hdi;
};

module.exports = {
  handleHDICreation,
  handleHDIDeletion,
};
