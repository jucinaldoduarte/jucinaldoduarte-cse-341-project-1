const router = require('express').Router();


router.get('/', (req, res) => {
    res.send("Root");
});

router.get('/home', (req, res) => {
    res.send("Home");
});

router.get('/Contact', (req, res) => {
    res.send("Contact");
});

module.exports = router;