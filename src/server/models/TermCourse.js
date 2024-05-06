import {DataTypes} from "sequelize"
import connection from "../connection.js"
import Term from "./Term.js"
import FacultyCourse from "./FacultyCourse.js"
import Room from "./Room.js"

const TermCourse = connection.define('TermCourse', {
    term_id: {
        type: DataTypes.BIGINT
    },
    course_id: {
        type: DataTypes.INTEGER
    },
    room_id: {
        type: DataTypes.BIGINT
    }, 
    start_date: {
        type: DataTypes.DATE
    },
    end_date: {
        type: DataTypes.DATE
    },
    days: {
        type: DataTypes.STRING
    }, 
    start_time: {
        type: DataTypes.TIME
    }, 
    end_time: {
        type: DataTypes.TIME
    }
}, {
    tableName: 'term_courses',
    timestamps: false
})

TermCourse.belongsTo(Term, {
    foreignKey: {
        field: 'term_id'
    }
});

TermCourse.belongsTo(FacultyCourse, {
    foreignKey: {
        field: 'course_id'
    }
});

TermCourse.belongsTo(Room, {
    foreignKey: {
        field: 'room_id'
    }
})

export default TermCourse