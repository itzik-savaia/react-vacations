module.exports = (sequelize, Sequelize) => {
    const Vacations = sequelize.define('vacation', {
        description: {
            type: Sequelize.STRING
        },
        destination: {
            type: Sequelize.STRING
        },
        fromDate: {
            type: Sequelize.STRING
        },
        toDate: {
            type: Sequelize.STRING
        },
        img: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        follower: {
            type: Sequelize.STRING
        },

    })




    return Vacations;
}  