import jwt from "jsonwebtoken";
import Post from '../models/post.js';

export default class postController {

    async createPost(token, data) {
        try {

            var decodedData = jwt.verify(token, 'mySecretKey');
            if (decodedData) {
                    const newPost = new Post({
                    title: data.body.title,
                    content: data.body.content,
                    user_Id: decodedData.data._id,
                    filename: data.file.originalname,
                    contentType: data.file.mimetype, 
                    path: data.file.path,
                })
                const saveData = await newPost.save();
                if (saveData) {
                    return { message: 'successfully post Created' }
                } else {
                    return { message: 'failed please try again' }
                }
            } else {
                return { message: 'failed please try again' }

            }

        } catch (error) {
            return error
        }
    }

    async getPosts() {
        try {
            const allPosts = await Post.find()
            if (allPosts) {
                console.log(allPosts, "allPosts");
                return {
                    message: 'all post',
                    data: allPosts
                }
            } else {
                return { message: 'failed please try again' }
            }



        } catch (error) {
            return error
        }
    }

}
