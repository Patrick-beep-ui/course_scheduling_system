import {DataTypes} from "sequelize"
import connection from "../connection.js"
import TermCourse from "./TermCourse.js"
import Student from "./Student.js"

const StudentSchedule = connection.define('StudentSchedule', {
    student_id: {
        type: DataTypes.BIGINT
    },
    period_course_id: {
        type: DataTypes.BIGINT
    },
    delivery: {
        type: DataTypes.ENUM('Not Online', 'Online', 'Hybrid'),
        allowNull: true
    }, 
    section: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}, {
    tableName: 'student_schedules',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

StudentSchedule.belongsTo(Student, {
    foreignKey: {
        field: 'student_id'
    }
});

StudentSchedule.belongsTo(TermCourse, {
    foreignKey: {
        field: 'period_course_id'
    }
})

export default StudentSchedule