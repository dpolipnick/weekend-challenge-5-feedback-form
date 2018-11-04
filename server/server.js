const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const pool = require('./modules/pool.js');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/

// GET response for feedback
app.get('/feedback', (req, res) => {
    const sqlText = `SELECT * FROM feedback ORDER BY id, feeling, understanding, support, comments, flagged, date DESC;`;
    pool.query(sqlText)
        // if the query is successful, log and send result to client
        .then((result) => {
            console.log(`Got stuff back from the database`, result);
            res.send(result.rows);
        })
        // if the query is unsuccessful, log and send client an error
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
  }); // end GET response
  

  // POST response for submitting new feedback 
  app.post('/feedback', (req, res) => {
    const newFeedback = req.body;
    console.log('About to POST newFeedback/req.body:', newFeedback);
    // const sqlText = `INSERT INTO feedback (id, feeling, understanding, support, comments, flagged, date)
    const sqlText = `INSERT INTO feedback (feeling, understanding, support, comments)
    VALUES ($1, $2, $3, $4)`;
    // SQL sanitize our inputs
    pool.query(sqlText, [newFeedback.feeling, newFeedback.understanding, newFeedback.support, newFeedback.comments])
        // If POST is successful, log and send good status
        .then((response) => {
            console.log(`Added song to the database`, newFeedback);
            console.log('Response in POST is:', response);
            res.sendStatus(201);
        })
        // If POST is unsuccessful, log and send bad status
        .catch((error) => {
            console.log(`Error making database POST query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
  }); //end POST response


/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});