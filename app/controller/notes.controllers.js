"use strict"

const Notes = require('../models/notes.models');

exports.create = (req, res) => {

    if (!req.body.title && req.body.notes && req.body.category) {
        return res.status(404).send({
            message: 'notes body is empty'
        })
    }

    const notes = new Notes({
        title: req.body.title,
        notes: req.body.notes,
        category: req.body.category
    })
    notes.save()
        .then(data => {
            // console.log('data', data)
            Notes.findById(data._id).populate('category')
                .then(insertdata => {
                    // console.log('insert data', insertdata)
                    res.send({
                        status: 202,
                        message: 'create data succesfully',
                        data: insertdata
                    })
                })
        }).catch(err => {
            return res.status(404).send({
                message: err.message || "error create dategory"
            })
        })
}

exports.getNotes = async (req, res) => {

    let limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
    let page = (req.query.page) ? parseInt(req.query.page) : 1;
    let offset = (page - 1) * limit;
    let search = (req.query.search) ? req.query.search : '';
    let totalRows;
    let sort;
    if (req.query.sort) {
        if (req.query.sort.toLowerCase() == 'asc' || req.query.sort.toLowerCase() == 'asc') {
            sort = req.query.sort;
        } else {
            sort = 'desc';
        }
    } else {
        sort = 'desc';
    }
    await Notes.countDocuments({
            'title': {
                $regex: search,
                $options: 'i'
            }
        })
        .then((data) => {
            totalRows = data;
        })
    let totalPage = Math.ceil(parseInt(totalRows) / limit);
    Notes.find({
            'title': {
                $regex: search,
                $options: 'i'
            }
        }).populate('category')
        .sort({
            createdAt: sort
        })
        .limit(limit)
        .skip(offset)
        .then(data => {
            res.json({
                status: 202,
                totalData: totalRows,
                limit: limit,
                totalPage: totalPage,
                page: page,
                data: data
            })
        }).catch(err => {
            return res.send({
                status: 404,
                message: 'daata not found'
            })
        })
}

exports.getById = async (req, res) => {
    const id = req.params.Id
    let limit = (req.query.limit) ? parseInt(req.query.limit) : 10;
    let page = (req.query.page) ? parseInt(req.query.pagae) : 1;
    let offset = (page - 1) * limit;
    let totalRows;

    await Notes.countDocuments()
        .then((data) => {
            totalRows = data;
        })
    let totalPage = Math.ceil(parseInt(totalRows) / limit);

    await Notes.findById(id).populate('category')
        .limit(limit)
        .skip(offset)
        .then(data => {
            if (!data) {
                return res.send({
                    status: 404,
                    message: 'data not found' + id
                })
            }
            return res.json({
                status: 202,
                totalData: totalRows,
                limit: limit,
                totalPage: totalPage,
                page: page,
                data: data
            })
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.send({
                    status: 404,
                    message: 'daata not found'
                })
            }
            return res.send({
                status: 500,
                message: 'error retivering with id' + id
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.Id

    if (!req.body.title && req.body.notes && req.body.category) {
        return res.send({
            status: 404,
            message: 'data is body empty'
        })
    }

    Notes.findByIdAndUpdate(id, {
            title: req.body.title,
            notes: req.body.notes,
            category: req.body.category,
        }, {
            new: true
        })
        .then(data => {
            if (!data) {
                res.send({
                    status: 404,
                    message: 'data not found'
                })
            }
            Notes.findById(data._id).populate('category')
                .then(updateData => {
                    res.send({
                        status: 202,
                        message: 'data sucesfully update',
                        data: updateData
                    })
                })
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                res.send({
                    status: 404,
                    message: 'data not found'
                })
            }
            return res.send({
                status: 500,
                message: "error updating"
            })
        })

}

exports.delete = (req, res) => {
    const id = req.params.Id

    Notes.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.send({
                    status: 404,
                    message: 'data not found'
                })
            }
            res.send({
                status: 202,
                message: 'delete sucesfully'
            })
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.send({
                    status: 400,
                    message: 'data not found'
                })
            }
            return res.send({
                status: 500,
                message: 'erro data'
            })
        })
}