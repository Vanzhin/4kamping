"use strict"
const fs = require('fs');
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

let multer = require('multer');
app.use(multer({
	dest: "uploads"
}).single("filedata"));

app.use(express.json());
// app.use('./sideJs',express.static(path.join(__dirname, 'www/sideJs')));

app.use(express.static(__dirname + './www'));

const {
	APP_PORT,
	APP_IP,
	APP_PATH
} = process.env;

const indexPath = path.join(path.dirname(APP_PATH), 'index.html');
const orderPath = path.join(path.dirname(APP_PATH), 'order.json');
const feedbackPath = path.join(path.dirname(APP_PATH), 'feedback.json');

console.log("индекс:", indexPath);
app.get('/', (req, res) => {
	fs.readFile(indexPath, (err, data) => {
		if (err) {
			res.writeHead(400, {
				'Content-Type': 'text/plain'
			});
			res.write('index.html not found');
		} else {
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			res.write(data);
		}
		res.end();
	})
})


app.listen(APP_PORT, () => {
	console.log(`Server running at http://${APP_IP}:${APP_PORT}/`)
});
app.post('/order', (request, response) => {
	// 	console.log("request.body:", request.body);
	fs.readFile(orderPath, 'utf-8', (err, data) => {
		// console.log(data);
		if (err) {
			console.log("read order.json error", err);
			response.send("read order.json error");
			return;
		}
		const order = JSON.parse(data);
		// 		console.log('order:', order);
		const item = request.body;
		// 		console.log('item:', item);



		order.push(item);
		// log(item.id);

		async function main() {
			let transporter = nodemailer.createTransport({
				host: 'mail.netangels.ru',
				port: 25,
				secure: false,
				auth: {
					user: `order@4kamping.ru`,
					pass: `redro1234`,
				},
			})

			// 			console.log(order);

			let result = await transporter.sendMail({
				from: '"4Kamping" <order@4kamping.ru>',
				to: 'info@4Kamping.ru',
				subject: 'Новая заявка 4Kamping.ru',
				html: `<p>Заявка с сайта. <br>телефон: +${item.tel}, <br>время: ${item.date}</p>`,
			})

			console.log(result);
		};
		main().catch(console.error);

		fs.writeFile(orderPath, JSON.stringify(order), (err) => {
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

	fs.readFile(feedbackPath, 'utf-8', (err, data) => {
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
				host: 'mail.netangels.ru',
				port: 25,
				secure: false,
				auth: {
					user: `order@4kamping.ru`,
					pass: `redro1234`,
				},
			})
			// console.log(feedbackUser);
			let result = await transporter.sendMail({
				from: '"4kamping" <order@4kamping.ru>',
				to: 'info@4kamping.ru',
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
					console.log(stats);
					fs.unlink(`./${filedata.path}`, (err) => {
						if (err) console.log("file was not attached", err); // если возникла ошибка    
						else console.log(`${filedata.originalname} was deleted`);
					});
				}
			})


			console.log(result);
		};
		main().catch(console.error);

		fs.writeFile(feedbackPath, JSON.stringify(feedback), (err) => {
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