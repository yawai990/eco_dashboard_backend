const bcrypt = require('bcryptjs');

const hashedPassword = ( password ) => bcrypt.hashSync(password,10);

module.exports = hashedPassword;