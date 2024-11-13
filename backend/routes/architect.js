const express = require('express');

const router = express.Router();

const Architect = require('../models/architect');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//imageUpload
filename = '';
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();

        let fl = date + '.' + file.mimetype.split('/')[1];

        redirect(null, fl);
        filename = fl;
    }
})

const upload = multer({ storage: mystorage })

//register 

router.post('/register', upload.any('image'), (req, res) => {
    data = req.body;
    architect = new Architect(data);


    architect.image = filename;

    salt = bcrypt.genSaltSync(10);
    architect.password = bcrypt.hashSync(data.password, salt);

    architect.save()
        .then(
            (savedArchitect) => {
                filename = '';
                res.status(200).send(savedArchitect);
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }

        )

})

//login

router.post('/login', (req, res) => {
    let data = req.body;
    Architect.findOne({ email: data.email })
        .then(
            (architect) => {
                let valid = bcrypt.compareSync(data.password, architect.password)
                if (!valid) {
                    res.status(200).send('email or password invalid');
                } else {
                    let payload = {
                        _id: architect._id,
                        email: architect.email,
                        fullname: architect.name + ' ' + architect.lastname
                    }
                    let token = jwt.sign(payload, '5773');
                    res.status(201).send({ mytoken: token })

                }
            }
        )
        .catch(
            err => {
                res.status(400).send(err)
            }
        )



})

//getall

router.get('/all', (req, res) => {
    Architect.find({})
        .then(
            (architects) => {
                res.status(200).send(architects);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )

})

router.get('/getbyid/:id', (req, res) => {
    let id = req.params.id
    Architect.findOne({ _id: id })
        .then(
            (architect) => {
                res.status(200).send(architect);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )

})

router.delete('/supprimer/:id', (req, res) => {
    let id = req.params.id
    Architect.findByIdAndDelete({ _id: id })
        .then(
            (architect) => {
                res.status(200).send(architect);
            }
        )
        .catch(
            (err) => {
                res.status(400).send(err);
            }
        )
})

router.put('/update/:id', upload.any('image'), (req, res) => {
    let id = req.params.id;
    let data = req.body;

    // Handle image update if an image file is uploaded
    if (req.files && req.files.length > 0) {
        data.image = filename;
    }

    // Handle password update if provided
    if (data.password) {
        let salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
    }

    // Update architect data
    Architect.findByIdAndUpdate({ _id: id }, data, { new: true })
        .then((updatedArchitect) => {
            filename = ''; // Reset filename after updating
            res.status(200).send(updatedArchitect);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});








module.exports = router;