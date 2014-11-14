function Producer(amqp) {
    console.log('create a publisher connection');
    this.connection = amqp.createConnection();
}    

Producer.prototype.start  = function() {
    this.connection.on('ready', function () {
        console.log('producer: connection made');
    });
};

Producer.prototype.sendMessage = function(message, callback) {
    var routingKey = 'my-queue', 
        options  = null,
        messageBody = { mesageBody : message };  

    console.log('publish a message');
    this.connection.publish(routingKey, messageBody, options, function() {
        callback('message sent');
    });
}

module.exports = Producer;
