const mongoose = require('mongoose');
const { DateTime } = require("luxon");

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
//get a formated date!
BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

//Export Schema
module.exports = mongoose.model('BookInstance',BookInstanceSchema);