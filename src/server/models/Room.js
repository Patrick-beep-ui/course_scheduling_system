import {DataTypes} from "sequelize"
import connection from "../connection.js"
import Building from "./Building.js";

const Room = connection.define('Room', {
    name: {
        type: DataTypes.STRING
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    components: {
        type: DataTypes.STRING,
        allowNull: true
    },
    building_id: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'rooms'
})

Room.belongsTo(Building, {
    foreignKey: 'building_id'
})

export default Room