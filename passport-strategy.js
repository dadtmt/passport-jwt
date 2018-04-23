
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// return a user if password is valid (wildcode)
const getFakeUser = ({username, password}) => Promise.resolve(
    password === 'wildcode' ? {username, password} : null
)

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return 
           getFakeUser.then(user => {
               if (!user) {
                   return cb(null, false, {message: 'Incorrect username or password.'});
               }
               return cb(null, user, {message: 'Logged In Successfully'})
          })
          .catch(err => cb(err))
    }
))
