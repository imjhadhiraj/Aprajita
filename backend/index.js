import express from 'express';
import env from 'dotenv';
env.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 
