require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at http://localhost:${PORT}`));
