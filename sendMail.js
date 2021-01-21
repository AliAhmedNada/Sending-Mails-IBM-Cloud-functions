var nodemailer = require('nodemailer');

let smtpConfig = {
	host: 'smtp.gmail.com', // you can also use smtp.gmail.com
	port: 465,
	secure: true, // use TLS
	auth: {
		user: '{{usermail}}',
		pass: '{{password}}'
	}
};

function main(params) {
	return new Promise(function(resolve, reject) {
		let response = {
			code: 200,
			msg: 'E-mail was sent successfully!'
		};

		if (response.code != 200) {
			reject(response);
		}

		console.log(`Validation was successful, preparing to send email...`);

		sendEmail(params, function(email_response) {
			response.msg = email_response['msg'];
			response.code = email_response['code'];
			response.reason = email_response['reason'];
			console.log(`Email delivery response: (${email_response['code']}) ${response.msg}`);
			resolve(response);
		});

	});
}

function sendEmail(params, callback) {

	let transporter = nodemailer.createTransport(smtpConfig);
	var htmlscript = ""
	let mailOptions = {
		from: 'SAM <usermail@gmail.com>', // change to user mail 
		to: params.email,
		subject: "Roadmap to implement an effective unmanned aircraft system program",
		html: " html "	
	    
	};
	transporter.sendMail(mailOptions, function(error, info) {

		let email_response = {
			code: 200,
			msg: 'Email was sent successfully',
			reason: 'Success'
		};

		if (error) {
			email_response.msg = 'Error';
			email_response.code = 500;
			email_response.email = params.email
			email_response.reason = error;
		} else {
			email_response.msg = info.response;
			email_response.code = 200;
			email_response.reason = info.response;
		}
		callback(email_response);
	});
}
