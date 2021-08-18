const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let BookSchema = new Schema({
  title: {type:String, required:true},
  author: {type: Schema.Types.ObjectId, ref: 'Author', required:true},
  summary : {type:String, required:true},
  isbn: {type:String, required:true, maxLength:100},
  genre:[{type:Schema.Types.ObjectId, ref:'Genre'}]
});

//virtual for Books urls
BookSchema.virtual('url')
.get(function(){
  return '/catalog/book/' + this._id;
});

//Export Model
module.exports = mongoose.model('Book',BookSchema);