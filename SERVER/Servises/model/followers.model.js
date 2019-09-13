module.exports = (sequelize, Sequelize) => {
    const Followers = sequelize.define('follower', {
        userId: {
            type: Sequelize.STRING
        },
        vacationId: {
            type: Sequelize.STRING
        },

    })

    return Followers;
}  