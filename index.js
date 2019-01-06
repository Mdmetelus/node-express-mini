// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();
const PORT = 4000;



server.get('/', (req, res) => {
    res.send('Hello World')
});

server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
            id: 1,
            name: 'samwize Gamgee'
        },
        {
            id: 2,
            name: 'frodo Baggins'
        }
    ];

    // res.status(200).send(hobbits);
    res.status(200).json(hobbits);
});

server.get('/stuff', (req, res) => {
    res.send(200, { message: 'request received'});
});

server.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello There ${name}!`);
});



server.get('/api/users', (req, res) => {
    // res.status(200).json(dbs.find())
    // res.json();
    db.find()
        .then( users => {
            console.log(`users ${users}`);
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: `failed to get users`});

        });
   

    
});

server.get('/api/users/:id', (req, res) => {
    const theId = req.params.id;
    //const { theId } = req.params; on slightly different format.
    // res.status(200).json(`${theId}`);
    db.findById(theId)
        .then( thisUser => {
            console.log(`thisUser ${thisUser}`);
            if (thisUser) {
                res.status(200).json(thisUser);
            } else {
                res.status(404).json({ message: `User does not exist.`})

            }
        })
        .catch(err => {
            res.status(500).json({ message: `We can't find the hommie, please try again later!` })
            res.status(500).json({ message: `We can't find the hommie, please try again later!` })
        });
})

// server.post()


// res.send([
//     ...props.hobbitsList
// ]));

server.listen(8000, () => console.log('API Running on 
 8000'));