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

Course.belongsTo(Course, {
  foreignKey: 'prerequisite',
  allowNull: true,
  onDelete: 'SET NULL', // Optional if you want to set the foreign key to NULL on deletion
  onUpdate: 'CASCADE' // Optional if you want to cascade updates to the foreign key
});

export default Course