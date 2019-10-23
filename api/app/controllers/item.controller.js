const Item = require('../models/item.model.js');

// create and save a new item
exports.createItem = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'content can not be empty!'
        });
    }

    const item = new Item({
        name: req.body.name,
        description: req.body.description
    });

    Item.create(item, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'some error occurred while creating the item'
            });
        else res.send(data);
    });
};

// get all items
exports.getAllItems = (req, res) => {
    Item.getAll((err,data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'some error occurred while getting all items'
            });
        else res.send(data);
    });
};

// get single item with item Id
exports.getItem = (req, res) => {
    Item.getById(req.params.itemId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `not found item with id ${req.params.itemId}`
                });
            } else {
                res.status(500).send({
                    message: `error retrieving item with id ${req.params.itemId}`
                });
            }
        } else res.send(data);
    });
};

// update and save an item by id
exports.updateItem = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'content can not be empty!'
        });
    }

    Item.updateById(
        req.params.itemId,
        new Item(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `not found item with id ${req.params.itemId}`
                    });
                } else {
                    res.status(500).send({
                        message: `error retrieving item with id ${req.params.itemId}`
                    });
                }
            } else res.send(data);
        }
    )
};

// delete an item wth item id
exports.deleteItem = (req, res) => {
    Item.deleteById(req.params.itemId, (err) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `not found item with id ${req.params.itemId}`
                });
            } else {
                res.status(500).send({
                    message: `error retrieving item with id ${req.params.itemId}`
                });
            }
        } else res.send({ message: 'item was deleted succesfully'});
    });
};

// delete all items
exports.deleteAllItems = (req, res) => {
    Item.deleteAll((err) => {
        if (err)
            res.status(500).send({
                message: err.message || 'some error occurred while removing all items'
            });
        else res.send({ message: 'all items were deleted successfully!'});
    });
};

