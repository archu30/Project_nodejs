const Post = require('../models/post');

// module.exports.create = function(req , res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err,post){
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('back');
    
//     });
// }
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        await post.populate('user');
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'post published');
        return res.redirect('back');

    } catch (err) {
        //console.log('Error', err);
        req.flash('error', err)
        return res.redirect('back');
    }

}