const Express = require("express");
const bodyParser = require('body-parser')

const MongoDB = require("./mongo");
const Routes = require("./routes");
const C = require("./constant");


class App {

    constructor() {
        this.app = Express();
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.mongoDb = new MongoDB();
        this.app.use("/", Routes);
    }

    initServer(){
        this.app.listen(C.APP_PORT, () => {
            console.log(`Getir Test Server initializing in ${C.ENV} environment`);
            console.log(`Server listening on port ${C.APP_PORT}`);
        });
    }
}

const app = new App();

app.initServer();

module.exports = app.app;