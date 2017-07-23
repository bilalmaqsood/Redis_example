  var app = require('express')();
  var server = require('http').Server(app);
  var io = require('socket.io')(server);
  var redis = require('ioredis');
   
  server.listen(8888);
  io.on('connection', function (socket) {
   
    var redisClient = redis.createClient();
    redisClient.subscribe('message');
   
    redisClient.on("message", function(channel, data) {
      console.log("mew message add in queue "+ data['message'] + " channel");
      socket.emit(channel, data);
    });
   
    socket.on('disconnect', function() {
      redisClient.quit();
    });
   
  });