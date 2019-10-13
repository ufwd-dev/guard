const mailer = require('nodemailer');
const config = require('../config.json');

module.exports = async function sender(options) {
	const transporter = mailer.createTransport(config.posterOptions);

	try {
		const verifypass = await transporter.verify();
		const sendResult = await transporter.sendMail(options);

		if (sendResult) {
			console.log(`[${new Date()}] Send email successfully!`);
		}

	} catch (error) {
		console.log(`[${new Date()}] Send email failed! Error Information: ${error.message}`);
	}
}