const router = require("express").Router();
const tokenBuilder = require('./token-builder');
const bcrypt = require("bcryptjs");
const User = require("../users/users-model");
const {
 checkUsernameExists,
 checkUsernameTaken
} = require("../auth/auth-middleware");


router.post(
    "/register",
   checkUsernameTaken,
    (req, res, next) => {
     const { username, password } = req.body;
     const hash = bcrypt.hashSync(password, 8);
     User.add({ username, password: hash })
      .then((newUser) => {
       res.status(201).json(newUser);
      })
      .catch(next);
   
    },
    );

    router.post('/login',checkUsernameExists,(req, res) => {
  
        let { username, password } = req.body;
      
        
        User.findBy({ username })
          .then(([user]) => {
            
      
            if (user && bcrypt.compareSync(password, user.password)) {
              
              const token = tokenBuilder(user);
      
              
              res.status(200).json({ message: "Welcome!", token, id: user.id });
            } else {
              res.status(401).json({ message: "Invalid credentials" });
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: error.message });
          });
      });
    

   
    module.exports = router;
   
