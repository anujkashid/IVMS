const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    state_name:String,
    state_status:String,
});
module.exports= mongoose.model('state',stateSchema);
