const isFutureDate = (date) => date > new Date();
const dateOfInvocation = () => new Date();
module.exports = { isFutureDate, dateOfInvocation }