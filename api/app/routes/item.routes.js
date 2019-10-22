module.exports = app => {
    const items = require('../controllers/items.controllers.js');

    // create new item
    app.post('/items', items.createItem);

    // get all items
    app.get('/items', items.getAllItems);

    // get a single item with item ID
    app.get('/items', items.getItem);

    // update an item with item ID
    app.put('/items/:itemId', items.updateItem);

    // delete an item with item ID
    app.delete('/items/:itemId', items.deleteItem);

    // delete all items
    app.delete('/items', items.deleteAllItems)
};