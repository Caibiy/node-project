// ./route.js
var controller=require('./app/controller');
var multipart=require('connect-multiparty');
var multipartMiddleware=multipart();

module.exports=function(app){
	app.get('/',controller.index);
	//Truncated for brevity
	app.get('/new',controller.new);
	//Use middleware
	app.post('/create',multipartMiddleware,controller.create);
}