const router = require('express').Router();
const {v4: uuidv4} = require('uuid');
const fs = require('fs');

router.get('/api/notes', (req, res) => {
    try {
        const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
        res.json(dbJson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/notes', (req, res) => {
    let dbJson = [];
    
    try {
        dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    } catch (error) {
        console.error(error);
    }

    const newFeedback = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };

    dbJson.push(newFeedback);
    fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
    res.json(dbJson);
});

router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync('db/db.json', 'utf8');
    let dataJSON = JSON.parse(data);  // Parse the JSON data
    
    const newNotes = dataJSON.filter((note) => {
        return note.id !== req.params.id;  // Use 'id' property for comparison
    });
    
    fs.writeFileSync('db/db.json', JSON.stringify(newNotes));
    res.json('Note deleted.');
});

module.exports = router;