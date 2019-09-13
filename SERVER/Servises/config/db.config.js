const mysql = require('./connecion');
const Sequelize = require('sequelize');

const connecion = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: mysql.dialect,

    pool: {
        max: mysql.max,
        min: mysql.pool.min,
        acquire: mysql.pool.acquire,
        idle: mysql.pool.idle
    }
});
connecion.sync({
    logging: console.log,
})

const db = {};

db.Sequelize = Sequelize;
db.connecion = connecion;

db.user = require('../model/user.model.js')(connecion, Sequelize);
db.role = require('../model/role.model.js')(connecion, Sequelize);
db.vacations = require('../model/vacation.modael.js')(connecion, Sequelize);
db.follower = require('../model/followers.model.js')(connecion, Sequelize);


db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId' });
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId' });
db.vacations.belongsToMany(db.follower, { through: 'vacation_followers', foreignKey: 'vacationId', otherKey: 'followersId' });
db.follower.belongsToMany(db.vacations, { through: 'vacation_followers', foreignKey: 'followersId', otherKey: 'vacationId' });

module.exports = db;