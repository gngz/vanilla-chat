const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})

module.exports = mongoose;
