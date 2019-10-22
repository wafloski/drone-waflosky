const sql = require('./db.js');

// constructor
const Item = function(item) {
    this.name = item.name;
    this.description = item.description;
};

Item.create = (newItem, result) => {
    console.log('cycyu');
    sql.query( 'INSERT INTO items SET ?', newItem, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('created item: ', { id: res.insertId, ...newItem });
        result(null, { id: res.insertId, ...newItem });
    })
};

Item.getById = (itemId, result) => {
    sql.query(`SELECT * FROM items WHERE id = ${itemId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found item: ', res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: 'not_found' }, null);
    });
};

Item.getAll = result => {
    sql.query('SELECT * FROM items', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('items: ', res);
        result(null, res);
    });
};

Item.updateById = (id, item, result) => {
    sql.query(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        [item.name, item.description, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            if (res.affectedRows === 0) {
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('updated item: ', { id: id, ...item});
            result(null, { id: id, ...item });
        }
    );
};

Item.deleteById = (id, result) => {
    sql.query(`SELECT * FROM items WHERE id = ?`, id,(err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('deleted item: ', id );
        result(null, res);
    });
};

Item.deleteAll = result => {
    sql.query('DELETE * FROM items', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log(`deleted: ${res.affectedRows} items`);
        result(null, res);
    });
};

module.exports = Item;