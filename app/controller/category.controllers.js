const Category = require('../models/category.models');

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: 'note body is empty'
        });
    }
    const category = new Category({
        name: req.body.name,
        image: req.body.image
    })

    //save
    category.save()
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.status(404).send({
                message: err.message || 'err cretaig to category'
            })
        })
}

exports.findAll = (req, res) => {
    Category.find()
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(404).send({
                message: err.message || 'not data in databse'
            })
        })
}

exports.findOne = (req, res) => {
    const Id = req.params.Id;

    Category.findById(Id)
        .then((cate) => {
            if (!cate) {
                return res.send({
                    status: 404,
                    message: `category not found with cate ${Id}`
                })
            }
            res.send(cate)
        }).catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'category not found with ID' + Id
                })
            }
            return res.status(500).send({
                message: 'error retrieving with Id' + Id
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.Id;
    const name = req.body.name;
    if (!name) {
        return res.status(404).send({
            message: 'category not found in body'
        })
    }
    //update find one
    Category.findByIdAndUpdate(id, {
            name: req.body.name,
            image: req.body.image
        }, {
            new: true
        })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: 'data not found with id ' + id
                })
            }
            res.send(data)
        }).catch(err => {
            if (!err.kind === 'ObjectId') {
                return res.status(500).send({
                    message: 'category not foun with id' + id
                })
            }
            return res.status(500).send({
                message: 'error updateing category with id' + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.Id
    Category.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message : 'data not found with id' + id 
            })
        }
        res.status(202).send({
            message : 'category delete succesfully'
        })
    }).catch(err => {
        if (err.kind === 'OBjectId') {
            return res.status(404).send({
                message : 'category not found with id' +id
            })
        }
        return res.status(500).send({
            message : 'could not delete with id' + id
        })
    })
}