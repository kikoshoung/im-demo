var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    moment = require('moment'),
    WSSever = require('ws').Server;

var userList = [];

var wsServer = new WSSever({
    host: 'localhost',
    port: 8200
}).on('connection', function(ws) {
    var userData = {};
    ws.on('message', function(data){
        data = JSON.parse(data);
        switch(data.type){
            case 'connect': // 通知有用户加入聊天
                onConnect(data);
                userData = data;
                break;
        }
    });
    ws.on('close', function(){
        var clone = userList.slice();

        clone.forEach(function(user, i){
            if(user.id == userData.id){
                userList.splice(i, 1);
            }
        });
        onLeave(userData);
    });
});

http.createServer(function(req, res) {
    var method = req.method;

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    });
    switch(req.method){
        case 'GET':
            var filePath = path.join(__dirname, '..', 'frontend', req.url);
            if(/\.(html|js|css)/.test(filePath) && fs.existsSync(filePath)){
                res.write(fs.readFileSync(filePath));
            } else {
                res.write('Resource not found');
            }
            break;
        case 'POST':
            var postData = '';

            req.on('data', function(postDataChunk) {
                postData += postDataChunk;
            });
            req.on('end', function() {
                res.write('Request resolved');

                // 保存信息到服务器
                saveMessage();

                // 向其他用户广播消息
                notifyMessage(postData);
            });
            break;
        default:
            res.write('Request method is not supported');

    }
    res.end();
}).listen(8100);

function saveMessage(){}
function notifyMessage(message){
    var clients = wsServer.clients;

    message = JSON.parse(message || {});
    message.type = 'message';
    message.time = moment(Date.now()).format('HH:mm:ss');

    clients.forEach(function(wsClient){
        wsClient.send(JSON.stringify(message));
    });
}
function onConnect(data){
    var existed = false;
    userList.forEach(function(user){
        if(user.id == data.id) existed = true;
    });
    if(!existed) userList.push(data);
    wsServer.clients.forEach(function(wsClient){
        if(!existed){
            wsClient.send(JSON.stringify({type: 'tip', data: data}));
        }
        wsClient.send(JSON.stringify({type: 'connect', data: userList}));
    });
}
function onLeave(data){
    data.leave = true;
    wsServer.clients.forEach(function(wsClient){
        wsClient.send(JSON.stringify({type: 'tip', data: data}));
        wsClient.send(JSON.stringify({type: 'leave', data: userList}));
    });
}
