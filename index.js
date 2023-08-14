// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json({ limit: '50mb' }));

// Import and use your routes here
const convRouter = require('./routes/conversation');
const codeRouter = require('./routes/code');
const imageRouter = require('./routes/image');
const musicRouter = require('./routes/music');
const videoRouter = require('./routes/video');

app.use('/api/conv', convRouter);
app.use('/api/code', codeRouter);
app.use('/api/image', imageRouter);
app.use('/api/music', musicRouter);
app.use('/api/video', videoRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
