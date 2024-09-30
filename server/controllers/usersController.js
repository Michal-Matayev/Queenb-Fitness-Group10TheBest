const users = require('../models/UsersModel');  // טוען את מודל המשתמשים

// פונקציית signIn
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // חיפוש משתמש לפי אימייל
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up.' });
        }

        // בדיקת סיסמה
        if (password !== user.password) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        // במצב של סיסמה נכונה, החזרת תשובה עם פרטי המשתמש (בעתיד אפשר להוסיף token)
        res.status(200).json({ message: 'Login successful!', user });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred during sign in.', error: err });
    }
}

// פונקציית signUp
const signUp = async (req, res) => {
    const { email, password } = req.body;

    try {
        // בדיקת קיום משתמש עם אותו אימייל
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. Please log in.' });
        }

        // יצירת משתמש חדש
        const newUser = new users({ email, password });

        // שמירת המשתמש החדש במאגר
        await newUser.save();

        // החזרת תשובה מוצלחת
        res.status(201).json({ message: 'User registered successfully!', newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error occurred during registration.', error: err });
    }
}

// ייצוא הפונקציות signIn ו-signUp
module.exports = {
    signIn,
    signUp,
};
