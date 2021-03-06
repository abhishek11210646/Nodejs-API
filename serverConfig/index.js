require('dotenv').config();
const bodyParser = require('body-parser');
const noc = require('no-console');
const cors = require('cors');
const dbConfig = require('./../config/db');
const environments = require('./../config/environments');
module.exports = (app, passport) => {
    noc(app);
    app.use(bodyParser.json());
    require('./../config/passport/')(passport);
    app.use(passport.initialize());
    app.use(cors());
    dbConfig(environments);
    require("./../config/route")(app, passport);
};
