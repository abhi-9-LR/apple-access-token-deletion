const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const webHookRouter = require('./api/routes/webhook')



const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//webhook route
app.use('/api/', webHookRouter);

app.listen(port, () => {
    console.log(`Your API Server is runing on port: ${port}`)
})
