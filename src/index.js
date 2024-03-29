const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path')
const { createAdmin } = require('../controllers/adminController'); 

const app = express();

const signupRoute = require('../routes/signup');
const loginRoute = require('../routes/login');
const adminRoute = require('../routes/admin');
const deezerRoutes = require('../routes/deezer');
const lyricsRoutes = require('../routes/lyrics');
const Item = require('../models/item');

const { requireAuth } = require('../middleware/authMiddleware');




const dbUrl = "mongodb+srv://merlenqyzy:microlab99@musstafina.feqeyzq.mongodb.net/?retryWrites=true&w=majority&appName=musstafina";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { 
        console.log('Connected to MongoDB Atlas');
        createAdmin(); 
    })
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));



app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.set('view engine', 'ejs');
app.use(express.static("public"))


app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true
}));



app.use('/', loginRoute);
app.use('/signup', signupRoute);
app.use('/admin', adminRoute);
app.use('/deezer', deezerRoutes);
app.use('/lyrics', lyricsRoutes
)

// app.get("/home", requireAuth, (req, res) => {
//     res.render("home");
// });

app.get("/home", requireAuth, async (req, res) => {
    try {
        const items = await Item.find();
        res.render("home", { items });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send("An error occurred while fetching items.");
    }
});



app.listen(3000, ()=> {
    console.log(`Server running on port 3000`)
})