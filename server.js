const exp=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=exp();

hbs.registerPartials(__dirname +'/views');
app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} ${req.method}${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
    	if(err)
    		console.log('unable to append');
    }); 
	next();
});
//app.use((req,res,next)=>{
//	res.render('maintanence.hbs');//maintance
//});
app.use(exp.static(__dirname +'/'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});
hbs.registerHelper('getCapital',(text)=>{
	return text.toUpperCase()
});
app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pagetitle:'HOME PAGE',
		welcome:'Welcome to my website',
		
});
   });
app.get('/projects',(req,res)=>{
res.render('projects.hbs',{
		pagetitle:'Project PAGE',
		
});
});
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pagetitle:'ABOUT PAGE',
		
	});
});
app.get('/bad',(req,res)=>{
	res.send({
errormess:'unable to handle it'
	});
})
app.listen(port,()=>{
	console.log(`server is on port no ${port}`);
});