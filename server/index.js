const express = require('express');
const cors = require('cors');
const monk = require('monk');
const rateLimit = require("express-rate-limit");

const app = express();

const db = monk('localhost/messages');
const messages = db.get('messages');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'sent!'
    });
});

app.get('/messages', (req, res) => {
    messages
      .find()
      .then(messages => {
        res.json(messages);
      });
  });

function isValidMessage(message){
    return message.name && message.name.toString().trim() !== '' && message.content && message.content.toString().trim() !== '';
}

app.use(rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 1
  }));

app.post('/messages', (req,res)=>{
    if(isValidMessage(req.body)){
        const message = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        messages
        .insert(messages)
        .then(createdMessage => {
          res.json(createdMessage);
        });
    }
    else{
        res.status(422);
        res.json({
            message: 'Name and content is required!'
        })
    }
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
})

