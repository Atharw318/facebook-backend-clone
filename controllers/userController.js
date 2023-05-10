import User from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export default class userController {
   
    async createUser(data) {
         try {
            const salt = bcrypt.genSaltSync(10);
             const hashPassword = bcrypt.hashSync(data.password, salt);
             const newUser = new User({
                 first_name: data.first_name,
                 last_name: data.last_name,
                 email : data.email,
                 password: hashPassword
             })

             console.log(newUser, "newUsernewUser");

             const saveData = await newUser.save();
             if (saveData) {
                 return { message :'successfully resgister'}
             }else{
                 return { message :'failed please try again'}
            }
         } catch (error) {
             return error
         }
    }

    async signIn(data) {
        try {
            const user = await User.findOne({email: data.email}).select('first_name email last_name password')
            const validPassword = await bcrypt.compare(data.password, user.password);
            if (user && validPassword ) {
                const tokendata = await jwt.sign({
                    data: user
                  }, 'mySecretKey', { expiresIn: '7h' });
    
                  
                return { 
                    message :'Successfully Logged In', 
                    data: tokendata
            }
            }else if (user && !validPassword) {
                return { message :'Please Enter Valid Password'}
            }
            else{
                return { message :'No user found with this email'}
            }
        } catch (error) {
            return error
        }
      }


  async getUser() {
    try {
        const usersData =  await User.find()
        
        if (usersData) {
            return usersData;
        }else{
            return { message :'No user Found, please try again'}
        }
    } catch (error) {
        return error
    }
  }

  async updateUser(data) {
    console.log(data);
  }
}