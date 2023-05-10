import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import postController from "../controllers/postController.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage })

router.post("/signup", upload.single('file'),  async (req, res) => {

    try {
      const data = req.body;
      const controller = new userController();
      const response = await controller.createUser(data);
       // res.cookie("token", response.data, {expires: '7h'})
      return res.send(response);
    } 
    catch (error) {
      return res.send(error);
    }

  });

  router.post("/signin", async (req, res) => {

    try {
      const data = req.body;
      const controller = new userController();
      const response = await controller.signIn(data);
      return res.send(response);
    }
     catch (error) {
      return res.send(error);
    }
  });

  router.post("/create-post",  upload.single('file'),  async (req, res) => {

    try {
      const token = req.headers.authorization.split("Bearer ")[1]
      const controller = new postController();
      const response = await controller.createPost(token , req);
      return res.send(response);
    } 
    catch (error) {
      return res.send(error);
    }

  });
  
  router.get("/posts", upload.single('file'), async (req, res) =>{
      console.log(req.file);
    try {
      console.log(req.body, "ddds");
      const controller = new postController();
      const response = await controller.getPosts();
      return res.send(response);
    } 
    catch (error) {
      return res.send(error);
    }
  })

  export default  router;