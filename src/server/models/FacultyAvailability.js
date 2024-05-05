import {DataTypes} from "sequelize"
import connection from "../connection.js";
import Faculty from "./Faculty.js";

const FacultyAvailability = connection.define('FacultyAvailability', {
    days: {
        type: DataTypes.STRING
    }, 
    start_time: {
        type: DataTypes.STRING
    }, 
    end_time: {
        type: DataTypes.STRING
    },
    faculty_id: {
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'faculty_availability',
    timestamps: false,
})

FacultyAvailability.belongsTo(Faculty, {
    foreignKey: 'faculty_id'
})

export default FacultyAvailability