const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

exports.signUp = async (req, res) => {
  console.log('executing signup function')
  try {

    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    // Store the new user in the session
    req.session.user = newUser;

    res.status(201)
       .json({
         status: 'success',
         data: {
           user: newUser
         }
       });

  } catch (error) {

    console.log(error);
    res.status(400)
       .json({
         status: 'fail'
       });
  }
}

exports.login = async (req, res) => {

  const {username, password} = req.body;

  try {

    const user = await User.findOne({username});

    if (!user) {
      return res.status(404)
         .json({
           status: 'fail',
           message: 'user not found'
         })
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (passwordIsCorrect) {
      // if the password validates, the user will be stored in the session
      req.session.user = user

      res.status(200)
         .json({
           status: 'success'
         });
    } else {
      res.status(400)
         .json({
           status: 'fail',
           message: 'incorrect username or password'
         })
    }

  } catch (error) {

    console.log(error);
    res.status(400)
       .json({
         status: 'fail'
       });
  }
}