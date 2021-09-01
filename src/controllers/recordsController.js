const RecordSchema = require("./../models/records");
const C = require("./../constant");

class RecordsController {
    constructor(){

    }

    async fetchRecords(reqBody){
        try{
            this.validateReq(reqBody);
            const records = await this.getRecordsFromDB(reqBody);
            
            const response = {
                code: 0,
                msg: C.MSGS.SUCCESS,
                records: records
            }
            return Promise.resolve(response)
        }
        catch(err){
            if(err.code){ throw err }
            else {
                console.log(err);
                throw {code: "RC007", msg: C.MSGS.INTERNAL_ERROR }
            }   
        }
    }

    validateReq(reqBody){
        try{
            //checking empty request body
            if(!reqBody) throw { code: "RC001" };      

            // Date validations
            const dateFormat = /^\d{4}\-\d{2}\-\d{2}$/; 
            if(!reqBody.startDate || !dateFormat.test(reqBody.startDate) || !new Date(reqBody.startDate).getTime()) throw { code: "RC002" };
            if(!reqBody.endDate || !dateFormat.test(reqBody.endDate) || !new Date(reqBody.endDate).getTime()) throw { code: "RC003" };
            if(new Date(reqBody.startDate).getTime() > new Date(reqBody.endDate).getTime() ) throw { code: "RC004" }

            //min max validations
            if(typeof reqBody.minCount !== "number" || typeof reqBody.maxCount !== "number" || reqBody.maxCount < reqBody.minCount ) throw { code: "RC005"}
            return reqBody;
        }
        catch(err){
            
            if(err.code) throw { ...err, msg: C.MSGS.INVALID_REQUEST }
            else{
                console.log(err);
                throw { code: "RC006", msg: C.MSGS.INTERNAL_ERROR }
            } 
        }
    }

    async getRecordsFromDB(reqBody){
        try{
            const records = await RecordSchema.aggregate([
                {
                    "$match": {
                        createdAt: {
                            $gte: new Date(reqBody.startDate),
                            $lt: new Date(reqBody.endDate)
                        }
                    }
                },{
                    "$project":{
                        _id:0,
                        key:1, 
                        createdAt:1,
                        totalCount: {  
                            $reduce:{
                                input:"$counts", 
                                initialValue:0, 
                                in:{  $add:["$$value","$$this"]}
                            }
                        }
                    }    
                },{
                    "$match": {
                        totalCount: {
                            $gt: reqBody.minCount,
                            $lt: reqBody.maxCount
                        }
                    }
                }
            ]);
            return Promise.resolve(records);
        }
        catch(err){
            console.log(err);
            throw { code: "RC008", msg: C.MSGS.INTERNAL_ERROR }
        }
    }

}

module.exports = RecordsController;