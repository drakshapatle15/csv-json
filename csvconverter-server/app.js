const csvjson = require("csvtojson")
const express = require('express')
const fs = require("fs")
const path = require('path');
const multer = require("multer")
const cors = require('cors') 
const app = express()
const port = 4000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) 
    }
});

const upload = multer({ storage: storage, limits: {fileSize: 10486 }});

const multerMiddleware = (req, res, next)=>{
    try{
        upload.single("file")(req, res, (err)=>{
            if(err) {
                console.log(err.message)
                res.status(413).json({status: 'error', message: err.message});
            }
            else next()
        })
    }
    catch (error){
        console.log("error came in multer")
    }
}

app.use(cors())

app.use(express.raw({ type: 'application/octet-stream' }));



app.post('/csv-to-json', multerMiddleware, async (req, res) => {
    let json;
    try {
        new RegExp(req.query.includeColumns)
    }
    catch(err) {
        res.status(422).json({message: "Please provide valid RegEx"})
        return
    }
    const conversionParams = {
        delimiter: req.query.delimiter,
        quote: req.query.quotes,
        headers: req.query.headers,
        includeColumns: new RegExp(req.query.includeColumns),
        noheader: Boolean(parseInt(req.query.noheader)),
        ignoreEmpty: Boolean(parseInt(req.query.ignoreEmpty)),
    }
    console.log("req.query.delimiter", req.query.delimiter)
    console.log("req.query.noheader", Boolean(parseInt(req.query.noheader)))
    console.log("req.query.quotes", req.query.quotes)
    console.log("req.query.ignoreEmpty", Boolean(parseInt(req.query.ignoreEmpty)))
    console.log("req.query.headers", req.query.headers)
    console.log("req.query.includeColumns", new RegExp(req.query.includeColumns))

    if (req.file) {
        const filePath = req.file.path;
        json = await csvjson(conversionParams).fromFile(req.file.path)
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
            console.log('File deleted successfully');
        });
    } else {
        const csvData = req.body.csvData;
        console.log("CSV Data", csvData);
        json = await csvjson(conversionParams).fromString(csvData);
    }
    res.send(json);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})