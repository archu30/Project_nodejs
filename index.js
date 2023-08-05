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
const MongoStore = require('connect-mongo');
//const sassMiddleware = require('node-sass-middleware');

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

 //mongo store is used to store the session cookie in the db
//  app.use(session({
//     // TODO change the secret before deployment in production mode
//      secret: 'blahsomething',
//      saveUninitialized: false,
//      resave: false,
//      cookie: {
//         maxAge: (1000*60*100)
//      },
//      store:  MongoStore.create(
//         {
            
//            mongooseConnection: db,
//            autoRemove: 'disabled'
            
//         },
//         function(err){
//             console.log(err || 'connect-mongo setup ok');
//         }
//      )
//  }));

app.use(session({
    name:"user_y",
    secret:"AnyValue",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/cpdeial_development',
        autoRemove:'disabled'
    },function(err){
        console.log(err || "Connect-mongo Setup ok");
    })

}));

 app.use(passport.initialize());
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);


 //use express router
 app.use('/' , require('./routers'));

 app.listen(port , function(err){
    if(err){
        console.log('Error: ' , err);
        console.log('Error in running the server: ${err}');
    }
     console.log('server is running on port: 8000');
 });

 