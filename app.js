const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');

dotenv.config({ path: require("path").resolve(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(express.static(`${__dirname}/public`));

// auth middleware function
async function authMiddleware(req, res, next) {    
    const token = req.cookies && req.cookies._sid;
    if (!token) {
        return res.redirect('/login');
    }

    const sessionExists = await fetch("https://44.223.10.16.nip.io/auth/checkSession", {
      method: "POST",
      body: JSON.stringify({session: req.cookies._sid}),
      headers: {
        "Content-Type": "application/json", 
      },
      credentials: 'include',
    })
    
    const response = await sessionExists.json();
    
    if (response.success === false) {
        return res.redirect('/login');
    }

    next();
}

async function adminAuthMiddleware(req, res, next) {
    const token = req.cookies && req.cookies._sid;

    if (!token) {
        return res.redirect('/login');
    }

    const sessionExists = await fetch("https://44.223.10.16.nip.io/auth/checkAdmin", {
      method: "POST",
      body: JSON.stringify({session: req.cookies._sid}),
      headers: {
        "Content-Type": "application/json", 
      },
      credentials: "include"
    })
    
    const response = await sessionExists.json();
    
    if (response.success === false) {
        return res.redirect('/user');
    }

    next();
}

app.get("/login", (req, res) => {
    console.log(req.cookies._sid);
    
    res.sendFile("public/login.html", {root: __dirname});
});

app.get("/register", (_, res) => {
    res.sendFile("public/register.html", {root: __dirname});
});

app.get("/user", authMiddleware, (_, res) => {
    res.sendFile("public/user.html", {root: __dirname});
});

app.get("/api", authMiddleware, (_, res) => {
    res.sendFile("public/api.html", {root: __dirname});
});

app.get("/admin", adminAuthMiddleware, (_, res) => {
    res.sendFile("public/admin.html", {root: __dirname});
});

app.get("/details", adminAuthMiddleware, (_, res) => {
    res.sendFile("public/details.html", {root: __dirname});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
