const nodemailer = require('nodemailer');

async function main() {
	let transporter = nodemailer.createTransport({
		host: 'smtp.mail.ru',
		port: 465,
		secure: true,
		auth: {
			user: `4kamping@mail.ru`,
			pass: `W3llm4N1605`,
		},
	})

	let result = await transporter.sendMail({
		from: '"4kamping" <4kamping@mail.ru>',
		to: 'nikolay.vanzhin@yandex.ru',
		subject: 'Test message',
		text: 'This message was sent from Node js server.',
		html: 'This <i>message</i> was sent from <strong>Node js</strong> server.',
	})

	console.log(result);
};
main().catch(console.error);