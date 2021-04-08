const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const log = require('./logger');
const nodemailer = require('nodemailer');


app.use(express.static('./static'));
app.use(cors());
app.use(express.json());


app.get('/order', (request, response) => {
	fs.readFile('./order.json', 'utf-8', (err, data) => {
		if (err) {
			console.log("read order.json error", err);
			response.send("read order.json error");
			return;
		}
		const orderInfo = JSON.parse(data)
		console.log(orderInfo);
		return response.send(data);
	})
});

app.post('/order', (request, response) => {
	fs.readFile('./order.json', 'utf-8', (err, data) => {
		// console.log(data);
		if (err) {
			console.log("read order.json error", err);
			response.send("read order.json error");
			return;
		}
		const order = JSON.parse(data);
		// console.log(order);
		const item = request.body;
		// console.log(item);



		order.push(item);
		// log(item.id);

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
			console.log(order);
			let result = await transporter.sendMail({
				from: '"4kamping" <4kamping@mail.ru>',
				to: 'nikolay.vanzhin@yandex.ru',
				subject: 'Новая заявка 4Kamping.ru',
				text: `Заявка с сайта. телефон: +${item.tel}, время: ${item.date}`,
			})

			console.log(result);
		};
		main().catch(console.error);

		fs.writeFile('order.json', JSON.stringify(order), (err) => {
			if (err) {
				console.log("write order.json error", err);
				response.json({
					status: 0,
					message: "write order.json error",
					error: err,
				});
				return;
			};
			response.json({
				result: 1
			})
		})
	})
});


app.listen(3000, () => {
	console.log("app is running 3000")
})