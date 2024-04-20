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
        allowNull: true,
        defaultValue: null,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
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

Course.hasOne(Course, {
    foreignKey: 'prerequisite',
    allowNull: true,
})

export default Course