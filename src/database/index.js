const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://vanilla-chat.dev/vanilla-chat', {useNewUrlParser: true})

module.exports = mongoose;
