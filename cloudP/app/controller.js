// ./app/controller.js
// Dependencies
var cloudinary=require('cloudinary');
//Mongoose Model
var Model=require('./model');

module.exports={
	new :function(req,res){
		res.render('pages/new');
	},
	create:function(req,res){
		cloudinary.v2.uploader.upload(req.file.image.path,
			//Transform
			{width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual'},
			function(err,result){
				console.log(result);
				    var post = new Model({
                  title: req.body.title,
                  description: req.body.description,
                  created_at: new Date(),
                  image: result.url,
                  image_id: result.public_id
              });

              post.save(function (err) {
                  if(err){
                      res.send(err)
                  }
                  res.redirect('/');
              });
			}
			);
	},
	index:function(req,res){
		Model.find({},function(err,posts){
			if(err)res.send(err);
			res.render('pages/index',{posts:posts});
		});
	}
};