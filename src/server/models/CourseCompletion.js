import {DataTypes} from "sequelize"
import connection from "../connection.js"
import Student from "./Student.js"
import Course from "./Course.js"

const CourseCompletion = connection.define('CourseCompletion', {
    student_id: {
        type: DataTypes.BIGINT
    },
    course_id: {
        type: DataTypes.INTEGER
    },
    completion_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'course_completion',
    timestamps: false
})

CourseCompletion.belongsTo(Student, {
    foreignKey: 'student_id'
})

CourseCompletion.belongsTo(Course, {
    foreignKey: {
        field: 'course_id'
    }
})

export default CourseCompletion