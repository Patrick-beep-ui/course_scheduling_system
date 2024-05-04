import {DataTypes} from "sequelize"
import connection from "../connection.js"

const Building = connection.define('Building', {
    building_name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'buildings',
    timestamps: false
})

export default Building