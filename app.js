require('dotenv').config();
express = require('express');
const bodyParser = require('body-parser');

require('./server/config/db.config');
// require('./api/model/user.model');
app = express();




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

var routes = require('./server/routes/routes');
routes(app);

//middleware for error handling
app.use((err,req,res,next)=>{
    if(err){
      res.status(400).json({ error: err.error });
    }
    next();
})



const listen = app.listen(process.env.PORT, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
})  
module.exports= app;



