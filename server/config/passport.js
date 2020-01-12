import JwtStrategy from "passport-jwt/lib/strategy";
import LocalStrategy from "passport-local/lib/strategy";
import passport from "passport";
import { jwtSecret } from "./vars";
import User from "../api/services/user/model";

const extractCookie = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: extractCookie,
      secretOrKey: jwtSecret
    },
    async (payload, done) => {
      try {
        // find the user specifed in the token
        const user = await User.findById(payload.sub);

        // if user doesn't exist, handle it
        if (!user) {
          return done(null, false);
        }

        // return the user
        done(null, user);
      } catch (err) {
        done(err, false);
        console.error(`Passport error: \n ${err}`);
      }
    }
  )
);

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        // find the user from email
        const user = await User.findOne({ email });

        // if !user, handle it
        if (!user) {
          return done(null, false);
        }

        // check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // if not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        // return user
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
