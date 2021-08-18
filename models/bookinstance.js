const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let BookInstanceSchema = new Schema({
  book: {type: Schema.Types.ObjectId, ref: 'Book', required:true},
  imprint: {type:String, required:true},
  status : {type:String, required:true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
  due_back: {type:Date, required:true, default: Date.now}
});

//virtual for Books urls
BookInstanceSchema.virtual('url')
.get(function(){
  return '/catalog/bookinstance/' + this._id;
});

//Export Schema
module.exports = mongoose.model('BookInstance',BookInstanceSchema);