import express from 'express';
import {QueryTypes} from "sequelize";
import connection from "./connection.js";

import Major from "./models/Major.js";
import Course from "./models/Course.js";
import User from "./models/User.js";
import Room from './models/Room.js';
import Term from './models/Term.js';
import Student from "./models/Student.js";
import Faculty from './models/Faculty.js';

const api = express.Router({mergeParams: true});

//Create the API

//majors
api.route("/majors/:id?")
.get(async (req, res, next) => {
    const majors = await Major.findAll();
    res.status(201);
    res.json({
        majors
    })
})
.post(async (req, res, next) => {
    try{
        const major = new Major({
            major_name: req.body.major_name,
            degree: req.body.degree,
            credits: req.body.credits
        });

        await major.save();
        const majors = await Major.findAll();

        res.status(201).json({
            msg: 'Course saved successfully',
            majors
        });

    } catch(err){
        console.error(err);
    }
})
.delete(async (req, res) => {
    try {
        const {id} = req.params
        await Major.destroy({where: {id}});

        const majors = await Major.findAll();
        res.status(200).json({
            msg: 'Major deleted successfully',
            majors
             });
    }
    catch(err) {
        console.error(err);
    }
})

//courses
api.route("/courses/:major_id/:course_id?")
.get(async (req, res) => {
    const id = req.params.major_id;
    const courses = await Course.findAll({
        where: {
            major: id
          }
    });
    res.status(201);
    res.json({
        courses
    })
})
.post(async (req, res, next) => {
    try {
        const id = req.params.major_id;
        const course = new Course({
            code: req.body.code,
            credits: req.body.credits,
            prerequisite: req.body.prerequisite,
            major: id,
            course_name: req.body.course_name
        });
        await course.save();
        
        const courses = await Course.findAll({
            where: { major: id }
        });

        res.status(201).json({
            msg: 'Course saved successfully',
            courses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
.delete(async (req, res) => {
    try {
        const course_id = req.params.course_id
        const id = req.params.major_id;
        await Course.destroy({
            where: {
                id: course_id
            }
        }) 
        const courses = await Course.findAll({
            where: {
                major: id
              }
        });
        res.status(201);
        res.json({
            msg: 'Major deleted successfully',
            courses
        })
    }
    catch(e) {
        console.error(e);
    }
})

//Users
api.route("/users")
.get(async (req, res, next) => {
    const users = await User.findAll();

    res.status(201);
    res.json({
        users
    })
});


//Rooms
api.route("/rooms")
.get(async (req, res, next) => {
    const rooms = await Room.findAll();

    res.status(200);
    res.json({
        rooms
    })
})

//Periods
api.route("/terms")
.get(async (req, res, next) => {
    const terms = await Term.findAll();

    res.status(200);
    res.json({
        terms
    })
})

//Students
api.route("/students/:major_id/:student_id?")
.get(async (req, res, next) => {
    //const students = await Student.findAll();
    const id = req.params.major_id;
    const students = await connection.query(`
    SELECT CONCAT(u.first_name, ' ', u.last_name) as student_name, 
           m.major_name as major, 
           s.student_id, s.id
    FROM users u 
    JOIN students s ON u.id = s.user_id
    JOIN majors m ON s.major = m.id
    WHERE m.id = ${id}
    GROUP BY student_name, major
    ORDER BY student_id;
`, {
    type: QueryTypes.SELECT
});

    res.status(200);
    res.json({
        students
    })
})
.post(async (req, res, next) => {
    try {
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        });

        console.log(req.body.first_name)
        console.log(req.body.last_name)

        await user.save();

        const student = new Student({
            major: req.body.major,
            user_id: user.id,
            student_id: req.body.student_id
        })

        await student.save();

        const students = await Student.findAll();
        
        res.status(200).json({
            msg: 'Student saved successfully',
            students
        })
        //res.render(`/students/${id}`)
    }
    catch(e){
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
.delete(async (req, res) => {
    try {
        const id = req.params.student_id;
        await Student.destroy(
            {where: {
                id: id
            }});

        const students = await Student.findAll();
        res.status(200).json({
            msg: 'Major deleted successfully',
            students
            });
    }
    catch(e) {
        console.error(e);
    }
});

api.route('/faculty/:faculty_id?')
.get(async (req, res, next) => {
    const faculty = await connection.query(`SELECT CONCAT(u.first_name, ' ', u.last_name) as 'professor_name', f.degree as 'professor_degree', f.id
    FROM users u JOIN faculty f ON u.id = f.user_id
    GROUP BY professor_name, professor_degree;`, {
        type: QueryTypes.SELECT
    });

    res.status(200);
    res.json({
        faculty
    })
})
.post(async (req, res, next) => {
    try {
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        });

        await user.save();

        const faculty = new Faculty({
            degree: req.body.degree,
            user_id: user.id,
        })

        await faculty.save();

        const faculties = await Faculty.findAll();
        
        res.status(200).json({
            msg: 'Student saved successfully',
            faculties
        })
    }
    catch(e) {
        console.error(e)
    }
})
.delete(async (req, res, next) => {
    try {
        const id = req.params.faculty_id
        await Faculty.destroy({
            where: {
                id: id
            }
        })
        const faculty = Faculty.findAll();
        res.status(200).json({
            msg: 'faculty deleted successfully',
            faculty
        })
    }
    catch(e) {
        console.error(e)
    }
})

export default api