const mongoose = require('mongoose');


const hostname = process.env.HOST;

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${hostname}/companydb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('database connected'));