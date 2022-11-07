const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 8000;
const Animal = require('./model/animal');
const mongoose = require('mongoose');
const { render } = require('ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/leones', { useNewUrlParser: true });

app.get('/', (req, resp) => {

    Animal.find()
        .then(animals => {
            console.log('animals', animals);
            resp.render('index', { animals });
            resp.end();
        })
        .catch(error => {
            console.log('error', error);
            resp.render('500');
            resp.end();
        });

});

app.get('/leones/nuevo', (req, resp) => {
    resp.render('createForm');
    resp.end();
});

app.post('/leones', (req, resp) => {
    console.log('req', req.body);

    const { name, weight, age, gender } = req.body;

    const animal = new Animal();
    animal.name = name;
    animal.weight = weight;
    animal.age = age;
    animal.gender = gender;

    animal.save()
        .then(newUser => {
            console.log('newUser', newUser),
                resp.redirect('/');
            resp.end();
        })
        .catch(error => {
            console.log('error', error);
            resp.render('500');
            resp.end();
        });

});

app.get('/leones/:id', (req, resp) => {

    const { id } = req.params;

    Animal.findById(id)
        .then(animal => {
            resp.render('detalle', { animal });
            resp.end();
        })
        .catch(error => {
            console.log('error', error);
            resp.end();
        });

});

app.get('/leones/editar/:id', (req, resp) => {

    const { id } = req.params;

    Animal.findById(id)
        .then(animal => {
            resp.render('editar', { animal, modificado: false });
            resp.end();
        })
        .catch(error => {
            console.log('error', error);
            resp.end();
        });

});

app.post('/leones/:id', async (req, resp) => {

    try {

        const { name, weight, age, gender } = req.body;

        console.log('age', age);

        const { id } = req.params;

        let animal = await Animal.findByIdAndUpdate(id, { name, weight, age, gender }, { new: true })

        resp.render('editar', { animal, modificado: true });
        resp.end();

    } catch (error) {

        console.log('error', error);
        resp.render('500');
        resp.end();

    }


});


app.post('/leones/destruir/:id', async (req, resp) => {

    try {

        const { id } = req.params;

        let animal = await Animal.findById(id);

        animal.remove();

        resp.redirect('/');

    } catch (error) {

        console.log('error', error);
        resp.render('500');
        resp.end();

    }


});

app.get('*', (req, resp) => {
    resp.render('404');
    resp.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});