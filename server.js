const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
var multer  = require('multer');




const items = require('./routes/api/items');

//initialize
const app = express();

// 
app.use(function(req, res, next) { //allow cross origin requests
res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
res.header("Access-Control-Allow-Origin", "http://localhost");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true}));
app.use(bodyParser.text());


var upload = multer({ //multer settings
    storage: storage 
}).single('file');


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});  

 /** API path that will upload the files */
 app.post('/upload', function(req, res) {
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});


const apiRoutes = require('./routes/api/apiRoutes');

 apiRoutes(app, db);
//Use Routes
//app.use('/api/items', items);

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 5000;

db.sequelize.sync().then(function(req, res) {
    app.listen(port, () => console.log(`Server started on port ${port}`));
});