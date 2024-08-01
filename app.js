const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');
const app = express();

app.use(bodyParser.json());

mongoose.connect(config.mongoURI);

app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
