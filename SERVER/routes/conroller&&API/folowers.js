var connection = require('../../mysql/mysql');


class followers {

    //POST-followers.
    static postFollowers(req, res, next) {
        connection.query(`SELECT * FROM followers
         WHERE id = "${id}" LIMIT 1`, function (err, rows, fields) {
                if (err) throw err
                res.send(rows[0])
            })

    }

    //DELETE-followers.
    static deleteFollowers(req, res, next) {
        connection.query(` DELETE  FROM followers
        WHERE vacation_id = "${req.body}" LIMIT 1`, function (err, rows, fields) {
                if (err) throw err
                res.send(rows[0])
            })

    }
}

module.exports = followers;
