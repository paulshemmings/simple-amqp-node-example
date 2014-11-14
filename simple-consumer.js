function Consumer(amqp) {
  console.log('create a consumer connection');
  this.connection = amqp.createConnection();
}

Consumer.prototype.start = function() {
    var self = this;
    self.connection.on('ready', function () {
        console.log('consumer: connection made');
        self.connection.queue('my-queue', function (queue) {
            queue.bind('#');
            queue.subscribe(function (message) {          
                console.log('received message:' + JSON.stringify(message) );
            });
            console.log('consumer is ready to receive messages');
        });
    });
}

module.exports = Consumer;