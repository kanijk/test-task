const express = require("express");
const router = express.Router();

const RecordCtrl = require("./controllers/recordsController");
const RecordsController = new RecordCtrl();

router.use((req,res, next)=>{
    console.log(`${req.method}: ${req.path}`);
    next()
})


router.get("/serverHealth", (req,res)=>{res.send("I am OK!")})
router.post("/fetchRecords",async (req, res)=>{
    try{
        const response = await RecordsController.fetchRecords(req.body);
        res.send(response)
    }
    catch(err){
        res.status(500).send(err);
    }

});
router.all("*",(req, res) => {res.sendStatus(404)})

module.exports = router;