const User = require('../models/user');



module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title: 'User Profile',
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in');
            }

        });

    }else{
        return res.redirect('/users/sign-in');
    }
}

// render the sign up
module.exports.signUp = function(req , res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_up' ,{
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req , res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in' ,{
        title: "Codeial | Sign in"
    })
}

//get the sign up data
module.exports.create = async function(req , res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        
        let users = await User.findOne({email: req.body.email})
        if(!users){
            let user=await User.create(req.body);
            return res.redirect('/users/sign-in');
        
        }else{
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log(error)
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req , res){

    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in singing in');return}
           
            //handle user found

            if(user){
                 //handle password which doesn't match
                 if(user.password != req.body.password){
                    return res.redirect('back');
                 }

                  //handle session creation
                  res.cookie('user_id',user.id);
                  return res.redirect('/users/profile');

            }else{
               //handle user not found
               return res.redirect('back');
            }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(req.user,function(err){
        if(err){
            console.log('error',err);
            return ;
        }
    });

    return res.redirect('/');
}