import request from 'superagent';
import WebSocket from 'ws';

const IP_ADDR = '192.168.0.157';
const URL_BASE = 'http://' + IP_ADDR + '/api/';
const WS_ADDR = 'ws://' + IP_ADDR + '/pubsub';

const websocket = new WebSocket(WS_ADDR);

websocket.on('message', (dataString) => {

    var data = JSON.parse(dataString);
    console.dir(data.message.battery);

});

websocket.on('open', () => {

    websocket.send(JSON.stringify({
        'Operation': 'subscribe',
        'Type': 'SelfState'
    }));
    
});

const whistle = async () => {

    await request.post(URL_BASE + 'led')
        .send({ 'red':255, 'green':0, 'blue':0 })
        .then(response => console.log('Sent: ' + response.status + ' : ' + response.text))
        .catch(error => console.log(error));

    await request.post(URL_BASE + 'audio/play')
        .send({ 'FileName' : '2.mp3', 'Volume': 25 })
        .then(response => console.log('Sent: ' + response.status + ' : ' + response.text))
        .catch(error => console.log(error));

    await request.post(URL_BASE + 'led')
        .send({ 'red':0, 'green':255, 'blue':0 })
        .then(response => console.log('Sent: ' + response.status + ' : ' + response.text))
        .catch(error => console.log(error));

}

whistle();