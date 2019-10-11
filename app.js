const express = require("express");
const app = express();
const multer = require("multer");
const path    = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname + "/picture"),
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
    storage : storage
}).single('picture');


app.post('/addPicture', function(req, res){
    upload(req, res, err => {
        if (err) throw err

         // เขียน req.file.filename ลง MySQL 
         // "INSERT INTO product (picture) VALUES('"+req.file.filename+"')

        res.json({status:"success",name:req.file.filename})
     });
 });

app.listen(8000, console.log("Start Port 8000"));
