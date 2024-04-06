import {DataTypes} from "sequelize"
import connection from "../connection.js"

const Term = connection.define('Term', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
})

export default Term