const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req , res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err,post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    
    });
}

// module.exports.create = async function (req, res) {
//     try {
//         let post = await Post.create({
//             content: req.body.content,
//             user: req.user._id
//         });
//         await post.populate('user');
//         if (req.xhr) {
//             return res.status(200).json({
//                 data: {
//                     post: post
//                 },
//                 message: "Post created!"
//             });
//         }

//         req.flash('success', 'post published');
//         return res.redirect('back');

//     } catch (err) {
//         //console.log('Error', err);
//         req.flash('error', err)
//         return res.redirect('back');
//     }

// }

module.exports.destroy = function(req , res){
    Post.findById(req.params.id, function(err , post){
       //.id means converting the object into string
        if(post.user == req.user.id){
              post .remove();

              Comment.deleteMany({post: req.params.id}, function(err){
                  return res.redirect('back');
              });
        }else{
            return res.redirect('back');
        }
    });
}