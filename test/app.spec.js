

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../src/app");
chai.should();
chai.use(chaiHttp);

before(function(done) {

    this.timeout(10000);
    done();
})

describe("ServerHealth Check",()=>{
    it("should check serverHealth",(done)=>{
        chai.request(app)
        .get("/serverHealth")
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    })
})

