const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

router.get('/notes', (req, res) => {
    console.log("Notes Route");
    res.sendFile(path.join(__dirname, '..', 'notes.html'));
});



module.exports = router;