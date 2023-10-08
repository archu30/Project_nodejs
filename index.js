 const express = require('express');
 const cookieParser = require('cookie-parser');
 const app = express();
 const port = 8000;
 const expressLayouts = require('express-ejs-layouts');
 const db = require('./config/mongoose');
 // used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
//const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// app.use(sassMiddleware({
//     src: '/.assets/scss',
//     dest: '/.assets/css',
//     debug: true,
//     outputStyle: 'expanded',
//     prefix: '/css'
// }));

app.use(express.urlencoded());

app.use(cookieParser());

 app.use(express.static('./assets'));

 app.use(expressLayouts);

 //extract style and scripts from sub pages into the layout
 app.set('layout extractStyles', true);
 app.set('layout extractScripts', true);

 

// set up the view engine
 app.set('view engine' , 'ejs');
 app.set('views', './views');

  

app.use(session({
    name:"user",
    secret:"AnyValue",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
    },
     store: new MongoStore({
        url: 'mongodb://127.0.0.1/cpdeial_development',
        autoRemove:'disabled'
    },function(err){
        console.log(err || "Connect-mongo Setup ok");
    })

}));

 app.use(passport.initialize());
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);

 app.use(flash());
 app.use(customMware.setFlash);

 //use express router
 app.use('/' , require('./routers'));

 app.listen(port , function(err){
    if(err){
        console.log('Error: ' , err);
        console.log('Error in running the server: ${err}');
    }
     console.log('server is running on port: 8000');
 });

 