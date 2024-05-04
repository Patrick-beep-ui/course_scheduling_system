import {DataTypes} from "sequelize"
import connection from "../connection.js"

const Term = connection.define('Term', {
    term_name: {
        type: DataTypes.ENUM('Spring', 'Fall', 'Summer'),
        allowNull: true
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    term_year: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

export default Term