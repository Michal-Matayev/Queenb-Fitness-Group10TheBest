const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

// Endpoint to receive username and password
app.get('/login/:email', (req, res) => {
    const { email } = req.params;
    const username = 'admin'; // הערך הקבוע שאיתו אתה בודק
    const password = 'password'; // אותו דבר כאן

    console.log("email", email)  
//   if (username === 'admin' && password === 'password') {

  if(email === username && password === 'password') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
