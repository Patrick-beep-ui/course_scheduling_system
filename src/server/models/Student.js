import User from "./User.js";
import Major from "./Major.js";
import {DataTypes} from "sequelize"
import connection from "../connection.js"

const Student = connection.define('Student', {
    major: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    student_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: false
})

Student.belongsTo(Major, {
    foreignKey: {
        field: 'major', 
        allowNull: true 
    }
});

Student.belongsTo(User, {
    foreignKey: {
        field: 'user_id', 
        allowNull: true 
    }
});

export default Student