import {DataTypes} from "sequelize"
import connection from "../connection.js"

const Course = connection.define('Course', {
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credits: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    prerequisite: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    major: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false   
    }
    
}, {
    timestamps: false,
})

export default Course