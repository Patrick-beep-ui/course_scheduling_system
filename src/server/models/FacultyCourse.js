import {DataTypes} from "sequelize"
import connection from "../connection.js"
import Faculty from "./Faculty.js";
import Course from "./Course.js";

const FacultyCourse = connection.define('FacultyCourse', {
    course_id: {
        type: DataTypes.INTEGER
    }, 
    faculty_id: {
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'faculty_courses',
    timestamps: false,
})

FacultyCourse.belongsTo(Course, {
    foreignKey: 'course_id'
})

FacultyCourse.belongsTo(Faculty, {
    foreignKey: 'faculty_id'
})

export default FacultyCourse