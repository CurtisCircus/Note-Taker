const express = require('express');
const htmlRoute = require('./routes/html-routes');
const apiRoute = require('./routes/api-routes');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(htmlRoute);
app.use(apiRoute);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`)

)