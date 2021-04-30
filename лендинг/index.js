const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const log = require('./logger');
const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));
let multer = require('multer');
app.use(multer({
	dest: "uploads"
}).single("filedata"));



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
	console.log(request.body);
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
				html: `<p>Заявка с сайта. <br>телефон: +${item.tel}, <br>время: ${item.date}</p>`,
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
app.post('/feedback', (request, response) => {
	let filedata = request.file;
	console.log(filedata);
	if (!filedata) {

		filedata = {};
		filedata.originalname = "";
		filedata.path = ""

	};

	fs.readFile('./feedback.json', 'utf-8', (err, data) => {
		// console.log(data);
		if (err) {
			console.log("read feedback.json error", err);
			response.send("read feedback.json error");
			return;
		}

		const feedback = JSON.parse(data);
		const feedbackUser = request.body;

		let d = new Date();
		d.setHours(d.getHours() + 5)
		feedbackUser.date = d;
		feedback.push(feedbackUser);
		console.log(feedback);


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
			// console.log(feedbackUser);
			let result = await transporter.sendMail({
				from: '"4kamping" <4kamping@mail.ru>',
				to: 'nikolay.vanzhin@yandex.ru',
				subject: 'Новый отзыв с 4Kamping.ru',
				html: `<p>Новый отзыв. <br>Имя пользователя: ${feedbackUser.userName},
				 <br>Почта пользователя: ${feedbackUser.userEmail},
				 <br>Период аренды: ${feedbackUser.userPeriod},
				 <br>Текст сообщения: ${feedbackUser.userMessage}</p>`,
				attachments: [{
					filename: `${filedata.originalname}`,
					path: `${filedata.path}`
				}]
			});
			fs.stat(`./${filedata.path}`, (err, stats) => {
				if (err) {
					console.error(err)
					return
				} else {
					fs.unlink(`./${filedata.path}`, (err) => {
						if (err) console.log(err); // если возникла ошибка    
						else console.log(`${filedata.originalname} was deleted`);
					});
				}
			})


			console.log(result);
		};
		main().catch(console.error);

		fs.writeFile('./feedback.json', JSON.stringify(feedback), (err) => {
			if (err) {
				console.log("write feedback.json error", err);
				response.json({
					status: 0,
					message: "write feedback.json error",
					error: err,
				});
				return;
			};
			response.json({
				result: 1
			})
		})

	});



});


app.listen(3000, () => {
	console.log("app is running 3000")
})