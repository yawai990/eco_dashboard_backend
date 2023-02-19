const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = require('express')();

app.use(fileUpload());
app.use(bodyParser.json({ extended : false}));
app.use(bodyParser.urlencoded({ extended : false}));
app.use(cookieParser());
app.use(cors());


require('./config/db')();

app.use('/api', require('./routes/apiRoute'));

app.use(require('./middleware/errorHandler'));
app.listen(5000, () => console.log('server is running in port 5000'))