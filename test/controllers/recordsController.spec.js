

const chai = require("chai");

const RecordCtrl = require("./../../src/controllers/recordsController");
const RecordsController = new RecordCtrl();
const expect = chai.expect;

describe("Controller: RecordsController",()=>{

    describe("Testing fetchRecords",()=>{
        it("it should fetch records",async ()=>{
            const reqBody = {
                "startDate": "2006-01-26",
                "endDate": "2018-12-22",
                "minCount": 3000,
                "maxCount": 3010
            }

            const response = await RecordsController.fetchRecords(reqBody);
            expect(response).to.have.property("code").equals(0);
            expect(response).to.have.property("msg").equals("success");
            expect(response).to.have.property("records").to.be.a("array").of.length.greaterThan(0);
            const record = response.records[0];
            expect(record).to.have.property("key").to.be.a("string").of.length.greaterThan(0);
            expect(record).to.have.property("createdAt").to.be.a("date");
            expect(record).to.have.property("totalCount").to.be.a("number");
        }).timeout(30000);


        it("it should return error response due to incorrect req body",async ()=>{
            const reqBody = {
                "startDate": "2006-01-26",
                "endDate": "2018-12-22",
                "minCount": 30000,   // min count > max count
                "maxCount": 3010
            }
            try{
                const response = await RecordsController.fetchRecords(reqBody);
            }
            catch(err){
                expect(err).to.have.property("code").not.equals(0);
                expect(err).to.have.property("msg").not.equals("success");
            } 
        }).timeout(30000);
    })

    describe("Testing validateReq",()=>{
        it("TO DO: Should return error with invalid req",(done)=>{
            done();
        })

        it("TO DO: Should not return error with valid req",(done)=>{
            done();
        })
    })

    describe("Testing getRecordsFromDB",()=>{
        it("TO DO: Should return error with invalid req",(done)=>{
            done();
        })

        it("TO DO: Should not return error with invalid req",(done)=>{
            done();
        })
    })
    
})
