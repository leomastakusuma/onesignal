var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.text())






var erc = require('express-route-controller');
erc(app, {
    controllers: __dirname + '/controllers/v',
    routes: {
      
        '/pushnotif': {
            action: 'Staticcontroller#pushtoAll',
            method: 'post'
        }


    }
});

// Route yang harus menggunakan token.
erc(app, {
    controllers: __dirname + '/controllers/v',
    routes: {
        '/push-notif': {
            action: 'Staticcontroller#pushtoAll',
            method: 'post'
        }

    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    response.error("Not Found", "Please check url", function (response) {
        res.json(response);
    });
    return;
});


var port = 8081;
try {
    app.listen(8081, '0.0.0.0', function () {
        console.log('listening on *:8081');
    });
    var env = app.get('env');

    console.log(env)
    console.log('API Start On PORT  ' + port);
} catch (e) {
    console.log("Error :\n" + e);
    var port2 = port + 1;
    app.listen(port2);
    console.log('API Start On PORT  ' + port2);
}

