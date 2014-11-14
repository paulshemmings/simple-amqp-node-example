var amqp = require('amqp'),
	Consumer = require('./simple-consumer'),
	Producer = require('./simple-producer');

// http://abhishek-tiwari.com/post/amqp-rabbitmq-and-celery-a-visual-guide-for-dummies
// http://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin
// https://github.com/postwait/node-amqp#exchangepublishroutingkey-message-options-callback

var Testbed = {

	producer : null,
	consumer : null,
	
	initialize : function() {

		this.consumer = new Consumer(amqp);
		this.producer = new Producer(amqp);

		this.consumer.start();
		this.producer.start();

		this.generateMessages();
	},

	generateMessages : function() {
		var self = this,
			stdin = process.stdin;

		// set input encoding. 
		stdin.setEncoding( 'utf8' );		

		// take in data from keyboard
		stdin.on( 'data', function(message){
			self.producer.sendMessage(message, function(log) {
				process.stdout.write(log);
			});
		});
	}	
};	


Testbed.initialize();







