const config = require('./config.json');
const check = require('./src');
const poster = require('./src/poster');

const checkPeriod = config.checkPeriod || 7;
const TIMEOUT = checkPeriod * 24 * 60 * 60 * 1000;

setInterval(async () => {
	const result = await check();

	if (!result) {
		poster({
			from: config.posterOptions.auth.user,
			to: config.recipients.join(','),
			subject: '[UFWD]数据库异常',
			html: `<h1 style="color: red">ufwd数据库出现问题，请尽快检查！</h1>`
		})
	}
}, TIMEOUT);