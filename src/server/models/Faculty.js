import User from "./User.js"
import {DataTypes} from "sequelize";
import connection from "../connection.js";

const Faculty = connection.define('Faculty', {
    degree: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    tableName: 'faculty',
    timestamps: false
})

Faculty.belongsTo(User, {
    foreignKey: {
        field: 'user_id',
        allowNull: true
    }
});

export default Faculty;