import User from "./User.js";
import Major from "./Major.js";
import {DataTypes} from "sequelize"
import connection from "../connection.js"

const Student = connection.define('Student', {
    major: {
        type: DataTypes.BIGINT
    },
    user_id: {
        type: DataTypes.BIGINT
    },
    student_id: {
        type: DataTypes.BIGINT
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
        allowNull: true,
    }
});

export default Student