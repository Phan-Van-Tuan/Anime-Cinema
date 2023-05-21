const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/anime',{
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        } );
        console.log('connect successfully!!');
        console.log('');
        console.log('------------------------');
    } catch (error) {
        console.log('connect failure!!');
    }
}

module.exports = { connect };