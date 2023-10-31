import cryptPassword from "../Utils/bcrypt/cryptPassword.js";
import passport from "passport";
import local from "passport-local";
import github from "passport-github2";
import { githubConfig } from "./github.config.js";
import userService from "../services/users.service.js";

const LocalStrategy = local.Strategy;
const GithubStrategy = github.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userService.getUserByEmail(username);

          if (user) {
            console.log("User already exists", user);
            return done(null, false);
          }

          const newUser = await userService.addUser(req.body, password);
          console.log("New user created", newUser);
          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userService.getUserById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          console.log(username);
          const user = await userService.getUserByEmail(username);
          console.log(user);

          if (!user) {
            console.log("User no existe");
            return done(null, false);
          }

          if (!cryptPassword.isValidPasswordMethod(password, user)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: "http://localhost:8080/auth/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await userService.getUserByEmail(profile._json.email);
          if (!user) {
            const newUserInfo = {
              first_name: profile._json.name,
              last_name: profile._json.name,
              age: "",
              email: profile._json.email,
              password: "", //ojo con esto porque no se puede guardar un password vacio
              //es decir cuando nos logueamos con github creamos un user en la db con un password vacio
              //esto se soluciona haciendo un array "profiles: [github, local]".
            };

            const newUser = await userService.addUser(newUserInfo);

            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export default initializePassport;
