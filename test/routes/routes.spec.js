

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../../src/app");
chai.should();
chai.use(chaiHttp);


describe("Route:fetchRecords",()=>{
    it("should get success response",(done)=>{
        chai.request(app)
        .post("/fetchRecords")
        .send({
            "startDate": "2006-01-26",
            "endDate": "2018-12-22",
            "minCount": 3000,
            "maxCount": 3010
        })
        .end(function(err, res) {
            res.should.have.status(200);
            done();
        });
    })
})

