const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./config/db');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Connect DB
connectDB();

//Initialize Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

//Define Routers
app.use('/api/users', require('./config/routes/api/users'));
app.use('/api/vender', require('./config/routes/api/vender'));
app.use('/api/auth', require('./config/routes/api/auth'));
app.use('/api/auth1', require('./config/routes/api/auth1'));
app.use('/api/playarea', require('./config/routes/api/playarea'));
app.use('/api/school', require('./config/routes/api/school'));
app.use('/api/preschool', require('./config/routes/api/preschool'));
app.use('/api/dance', require('./config/routes/api/dance'));
app.use('/api/drawing', require('./config/routes/api/drawing'));
app.use('/api/partyhall', require('./config/routes/api/partyhall'));
app.use('/api/sports', require('./config/routes/api/sports'));
app.use('/api/tution', require('./config/routes/api/tution'));
app.use('/api/yoga', require('./config/routes/api/yoga'));
app.use('/api/user_reg', require('./config/routes/api/user_reg'));

app.use('/api/view_school', require('./config/routes/api/view_school'));

app.use('/api/profile', require('./config/routes/api/profile'));
app.use('/api/posts', require('./config/routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
