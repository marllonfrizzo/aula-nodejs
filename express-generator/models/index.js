const Sequelize = require('sequelize');

const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: './data-base.sqlite',
});

const Usuario = sequelize.define('usuario', {
    id: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    nascimento: Sequelize.DATEONLY,
    email: {
        type: Sequelize.STRING(200),
        unique: true,
    }
});

module.exports = {
    sequelize,
    Usuario
}
