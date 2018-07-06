module.exports = function(app, db){
    
    const multer = require('multer');
   

   app.get('/api/all', (req, res)=> {
        db.Item.findAll({}).then((result) => {
            if(!result){
                res.status(404).json({ msg: "users not found" });
            } else {
                res.status(200).json(result);
            }  
        })
        .catch(err => res.status(404).json(err));
   });

   app.put('/api/new', (req, res)=> {
        db.Item.create({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price
        })
        .then( (result) => {
            res.json(result);
        })
        .catch(err => res.status(404).json({ msg : "There is no user"}));
   });

   app.post('/api/update/:id', (req, res)=> {
       db.Item.update({
           name : req.body.name,
           price : req.body.price,
           category : req.body.category
       }, {
            where :{
                id : req.params.id
            }
       })
       .then ( (result) => {
           res.json(result);
       });

   });

   app.delete('/api/delete/:id', (req, res)=> {
       db.Item.destroy({
           where : {
               id : req.params.id
           }
        })
       .then((result) => {
           res.status(200).json(result);
       })
       .catch(err => res.status(404).json({ msg: 'there is no users'}));
   });

   app.get('/api/hello', (req, res) =>{
        res.json('Hello page is working');
   });
}