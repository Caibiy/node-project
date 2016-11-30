//server.js



//BASE SETUP
//============================================================================

var Bear		=require('./app/models/bear');
var mongoose	=require('mongoose');
mongoose.connect('mongodb://localhost/bear');


//call the packages
var express		=require('express');
var app			=express();
var	bodyParser	=require('body-parser');

//configure app

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port=process.env.PORT||8080;

//ROUTES FOR OUR API
//==================================================

var router=express.Router();  //get an instance of express Router

//middleware to use for all requests

router.use(function(req,res,next){
	//log
	console.log("Something is happening");
	next()
});
//========================================
router.route('/bears').post(function(req,res){
	var bear=new Bear();
	bear.name=req.body.name;
	bear.save(function(err){
		if(err)
			res.send(err);
		res.json({message:'Bear created'});
	});
}).get(function(req,res){
	Bear.find(function(err,bears){
		if(err)
			res.send(err);
		res.json(bears)
	})
});
//======================================
router.route('/bears/:bear_id')
		.get(function(req,res){
			Bear.findById(req.params.bear_id,function(err,bear){
				if(err)
					res.send(err);
				res.json(bear);
			});
		})
		//update the bear
		.put(function(req,res){
			Bear.findById(req.params.bear_id,function(err,bear){
				if(err)
					res.send(err);
				bear.name=req.body.name;//update bears info
				bear.save(function(err){
					if(err)
						res.send(err);
					res.json({message:'Bear updated!'});
				});
			});
		});
//================================
router.get('/',function(req,res){
	res.json({message:'Horray! welcome to  our api'});
});

app.use('/api',router);

app.listen(port,function(){
	console.log('Listen app on '+port);
});
