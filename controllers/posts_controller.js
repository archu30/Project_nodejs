const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req , res){
   try{
 
    await  Post.create({
        content: req.body.content,
        user: req.user._id
    });  
        return res.redirect('back');
 
   }catch(err){
        console.log('Error',err);
        return;
   }
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

module.exports.destroy = async function(req , res){

    try{
        let post = await Post.findById(req.params.id);

    if(post.user == req.user.id){
        post .remove();

        await Comment.deleteMany({post: req.params.id});
        return res.redirect('back');
  }else{
      return res.redirect('back');
  }
    }catch(err){
        console.log('Error',err);
        return;
    }
}