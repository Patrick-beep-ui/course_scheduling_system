import express from "express";
import ViteExpress from "vite-express";
import expressSession from "express-session";
import api from "./api.js";
import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import User from "./models/User.js";
import bcrypt from 'bcryptjs';

const app = express();

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: 'y7Td#J9@2X!aFbZe',
  cookie: {
    signed: true,
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', api);

// Passport Configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({
        where: { username }, 
        attributes: ['id', 'username', 'password'] 
      });
      if (!user) {
        return done(null, false, { error: "Incorrect username" });
      }
      console.log(user)
      const passwordsMatch = bcrypt.compareSync(password, user.password);
      console.log(passwordsMatch)
      if (passwordsMatch) {
        return done(null, user);
      } else {
        return done(null, false, { error: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Routes
app.post( 
  "/login", 
  passport.authenticate("local", { session: false }), 
  (req, res) => { 
      req.session.name = req.body.username; 
      req.session.save(); 
      if (req.user) {
        // User is authenticated
        res.status(200).json({ message: "User authenticated", user: req.user });
    } else {
        // Authentication failed
        res.status(401).json({ message: "Authentication failed" });
    }
  } 
); 

app.post('/signup', async (req, res) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ first_name, last_name, email, username, password: hashedPassword });
    console.log(newUser)
    res.send('User created successfully');
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Username or email already exists');
    }
    res.status(400).send(err.message);
  }
});

//Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    return res.status(401).send('Unauthorized'); 
  }
};

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.send('Logged out successfully');
  
// });

app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    console.log(req.session)
  });
});

// Protected Route
app.get('/protected', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Protected Route');
  } else {
    res.status(401).send('Unauthorized');
  }
});



app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    msg: err.message
  });
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

