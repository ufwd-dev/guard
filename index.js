const config = require('./config.json');
const check = require('./src');
const poster = require('./src/poster');

const { checkPeriod } = config;

poster({
	from: config.posterOptions.auth.user,
	to: config.recipients.join(','),
	subject: '[UFWD]guard已启动',
	html: `<h1 style="color: green">ufwd数据库守卫已启动</h1>`
});

async function callback() {
	const result = await check();
	
	if (!result) {
		poster({
			from: config.posterOptions.auth.user,
			to: config.recipients.join(','),
			subject: '[UFWD]数据库异常',
			html: `<h1 style="color: red">ufwd数据库出现问题，请尽快检查！</h1>`
		})
	}
}

callback();
setInterval(callback, checkPeriod);