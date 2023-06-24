const mongoose=require('mongoose')


const postSchema=new mongoose.Schema({
    title:String,
    summary:String,
    text:String,
    cover:String,
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        username: String
      },
      

},
{
  timestamps: true,
}
)

const Post=mongoose.model('Post',postSchema);
module.exports=Post;