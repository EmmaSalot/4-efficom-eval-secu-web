const express = require('express');
const app = express();
const ipfilter = require('express-ipfilter').IpFilter
const userRouter = require('./route/user.route.js');
const authRouter = require('./route/auth.route.js');
const messageRouter = require('./route/message.route.js');
const roleRouter = require('./route/role.route.js');
const {connect} = require('./framework/connection.js');
const sync = require('./framework/sync.js');
const log = require('./middleware/log.middleware.js');
const logres = require('./middleware/logres.middleware.js');

const ips = ['127.0.0.1'] //remplir avec les ips

const database = async () => {
    await connect();
    await sync();
}

database();

app.use(ipfilter(ips));
app.use(express.json());
app.use(log);
app.use(logres);

app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/message',messageRouter);
app.use('/role',roleRouter);


module.exports = app;