import {DataTypes} from "sequelize"
import connection from "../connection.js"
import Student from "./Student.js"
import Term from "./Term.js"

const TermEnrollment = connection.define('TermEnrollment', {
    term_id: {
        type: DataTypes.BIGINT
    }, 
    student_id: {
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'term_enrollment',
    timestamps: false
})

TermEnrollment.belongsTo(Term, {
    foreignKey: {
        field: 'term_id'
    }
})

TermEnrollment.belongsTo(Student, {
    foreignKey: {
        field: 'student_id'
    }
})

export default TermEnrollment