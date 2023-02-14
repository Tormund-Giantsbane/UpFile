const express = require('express');
const multer = require('multer');

const app = express(); //this is the server
const port = 80; //port number on localhost

app.use(express.static('client')); // client is the folder for front-end

//API middleware
let count = 0;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname+'/solution');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, "solution_"+(++count));
    }    
});
let upload = multer({storage: storage});
//API routes
//get route: phan nay chua dung den khong can doc
app.get('/info', (req, res)=>{
    res.status(200).json({problem: 'problem details'});
});

//post route: phan nay dang dung
app.post("/upSolution", upload.single('solution'), (req, res)=>{
    console.log(req.body);
    console.log(req.file);
    //confirm message
    res.status(200).send({status : 'solution received'});
});
//API routes end

app.listen(port, ()=> console.log(`Server has started on port ${port}`));