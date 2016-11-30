// ./app/model.js
// Dependencies
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

// create a schema
var postSchema=new Schema({
	title:String,
	description:String,
	image:String,
	image_id:String,
	created_at:Date
});


//the schema is use