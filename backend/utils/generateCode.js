const { nanoid } = require("nanoid");

exports.generateShortCode = () => {
    return nanoid(6);
};