import {DataTypes} from "sequelize"
import connection from "../connection.js"

const Room = connection.define('Room', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    components: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false
})

export default Room