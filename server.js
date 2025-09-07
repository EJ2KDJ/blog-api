const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { userRouter, postsRouter } = require('./routes/Routes');

app.use('/users', userRouter);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error'});
});

module.exports = app;