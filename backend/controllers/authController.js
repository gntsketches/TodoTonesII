const User = require('../models/User');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring')

const BCRYPT_SALT_ROUNDS = 12;


module.exports = {
  async index(ctx) {
    console.log("authController index")
    ctx.state = { title: 'Login or Register' };
    console.log("doin' nothin'")
    // await ctx.render('auth');
  },

  async register(ctx) {
    const { body } = ctx.request;
    console.log("authController register body", body)
    // if (!body.)
    const session_key = randomstring.generate({
      length: 36,
      charset: 'alphabetic'
    });
    const userData = {
      ...body,
      // username: randomstring.generate(),
      // email: randomstring.generate(),
      password: await bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS),
      session_key
    };
    console.log('session_key', session_key)
    const user = await new User(userData).save();
    ctx.body = user
  },

  async login(ctx) {
    const { body } = ctx.request;
    console.log("authController login body", body)
    const user = await User.findOne({ username: body.username });
    if (!user) ctx.throw(404, 'user not found');
    const isValid = await bcrypt.compare(body.password, user.password);
    if (isValid) {
      ctx.body = user;
    } else {
      ctx.throw(400, 'invalid password');
    }
  },


  /*
 return ctx.ok({
   data: {
        SEO Tips:
        sessionKey: randomOlString

           which you save as the user's entry
               and just send to them when they login
              and 'logout' is just get rid of the sessionKey on client
            so all the OAuth is the same, just return a sessionKey
          so if the user is doing a secure operation, that has to be accompenied by the session key
        multiple API endpoints for logged-in and Not-logged-in
          (if there are differences, that is...)
      look at Atlas login for design inspiration. - two pages
        also in Atlas, we have 'auths' in DB -
          this links the password, sessionkey and userID
          and is utilized by the OAuths too...

    user },
   meta: {
     rando: 'random text',
     id: user._id,
     success: true,
   },
 });
*/


  async logout(ctx) {
    console.log("authController logout")
    delete ctx.session.user;
    ctx.redirect('/auth');
  }
};
