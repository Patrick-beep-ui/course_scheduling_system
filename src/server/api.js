import express from 'express';
import {QueryTypes, Op} from "sequelize";
import connection from "./connection.js";
import isAuth from './modules/auth.js';

import Major from "./models/Major.js";
import Course from "./models/Course.js";
import User from "./models/User.js";
import Room from './models/Room.js';
import Term from './models/Term.js';
import Student from "./models/Student.js";
import Faculty from './models/Faculty.js';
import Building from './models/Building.js';
import FacultyCourse from './models/FacultyCourse.js';
import FacultyAvailability from './models/FacultyAvailability.js';


const api = express.Router({mergeParams: true});

//Create the API

//majors
api.route("/majors/:id?")
.get(async (req, res, next) => {
    const id = req.params.id
    console.log(`Major id: ${id}`);
  
    if(id) {
        const majorID = await Major.findAll({
            where: { id: id }
        });
        res.json({
            majorID
        })
    } 
    else {
        const majors = await Major.findAll();
        res.status(201);
        res.json({
            majors
        })
    }
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
.put(async (req, res) => {
    try {
        const id = req.params.id; 
        const { major_name, degree, credits } = req.body;

        const major = await Major.findOne({
            where: {
                id: id
            }
        });

        await major.update({
            major_name: major_name,
            degree: degree,
            credits: credits
        });

        res.json({ message: 'Major updated successfully', major });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})


//courses
api.route("/courses/:major_id/:course_id?")
.get(async (req, res) => {
    const id = req.params.major_id;
    const course_id = req.params.course_id;

    console.log(course_id);

    if(course_id) {
        const courseID = await Course.findAll({
            where: { id: course_id }
        });
        res.json({
            courseID
        })
    } 
    else {
        const courses = await Course.findAll({
            where: {
                major: id
              }
        });
        res.status(201);
        res.json({
            courses
        })
    }

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
.put(async (req, res) => {
        try {
            const major_id = req.params.major_id;
            const course_id = req.params.course_id; 
            const { code, credits, prerequisite, course_name } = req.body;
    
            const course = await Course.findOne({
                where: {
                    major: major_id,
                    id: course_id
                }
            });
    
            await course.update({
                code: code,
                credits: credits,
                prerequisite: prerequisite,
                course_name: course_name,
                major: major_id
            });
    
            res.json({ message: 'Course updated successfully', course });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
})

api.route("/students")
.get(async (req, res) => {
    const students = await connection.query(`SELECT CONCAT(u.first_name, ' ', u.last_name) as 'student_name', m.major_name as 'major', s.student_id as 'student_id', m.id as 'major_id'
    FROM users u JOIN students s ON u.id = s.user_id
    JOIN majors m ON s.major = m.id
    GROUP BY student_name, major
    ORDER BY major;`, {
        type: QueryTypes.SELECT
    })
    res.status(200);
    res.json({
        students
    })
})

//Users
api.route("/users")
.get(async (req, res, next) => {
    const users = await User.findAll({
        where: {
            email: { [Op.not]: null }
        }
    });

    res.status(201);
    res.json({
        users
    })
});

//Admins
api.route("/admins")
.get(async (req, res, next) =>{
    const admins = await User.findAll({
        where: {
            role: "admin"
        }
    });

    res.status(201);
    res.json({
        admins
    })
})

// Update user role to admin
api.route("/users/:userId/make-admin")
.put(async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Update user role to admin
        user.role = "admin";
        await user.save();
        res.status(200).json({ message: "User role updated to admin" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//Buildings
api.route("/buildings/:building_id?")
.get(async (req, res, next) => {
    try {
        const building_id = req.params.building_id;

        if(building_id) {
            const buildingID = await Building.findOne({
                where: {
                    id: building_id
                }
            })

            res.status(201)
            res.json({
                buildingID
            })
        }
        else {
            const buildings = await Building.findAll();

            res.status(200);
            res.json({
                buildings
            })
        }
    }
    catch(e) {
        console.error(e)
    }
})
.post(async (req, res) => {
    try {
        const building = new Building({
            building_name: req.body.building_name
        })

        await building.save();

        const buildings = await Building.findAll();

        res.status(201).json({
            msg: 'Term saved successfully',
            buildings
        })

    }
    catch(e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
})
.delete(async (req, res) => {
    try {
        const id = req.params.building_id;

        const building = await Building.destroy({
            where: {
                id: id
            }
        })

        res.status(201)
        res.json({
            msg: 'Building deleted successfully',
            building
        })
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
})
.put(async (req, res) => {
    try {
        const id = req.params.building_id;

        const building = await Building.findOne({
            where: {
                id: id
            }
        })

        building.update({
            building_name: req.body.building_name
        })

        res.json({ message: 'Course updated successfully', building });
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//Rooms
api.route("/rooms/:building_id/:room_id?")
.get(async (req, res, next) => {
    try {
        const building_id = req.params.building_id;
        const room_id = req.params.room_id;
        
        if(room_id) {
            const roomID = await Room.findAll({
                where: {
                    building_id: building_id,
                    id: room_id
                }
            });
        
            res.status(200);
            res.json({
                roomID
            })
        }
        else {
            const rooms = await Room.findAll({
                where: {
                    building_id: building_id
                }
            });
        
            res.status(200);
            res.json({
                rooms
            })
        }
    }
    catch(e) {
        console.error(e);
    }
})
.post(async (req, res, next) => {
    const building_id = req.params.building_id;

    const room = new Room({
        name: req.body.room_name,
        capacity: req.body.capacity,
        components: req.body.components,
        building_id: building_id
    })

    await room.save();

    const rooms = await Room.findAll();

    res.status(201);
    res.json({
        msg: 'Room saved successfully',
        rooms
    })
})
.delete(async (req, res) => {
    try {
        const room_id = req.params.room_id
        const building_id = req.params.building_id;
        

        await Room.destroy({
            where: {
                id: room_id
            }
        })

        const rooms = await Room.findAll({
            where: {
                building_id: building_id
            }
        })

        res.status(201)
        res.json({
            msg: 'Building deleted successfully',
            rooms
        })
    }
    catch(e) {
        console.error(e);
    }
})
.put(async (req, res) => {
    const room_id = req.params.room_id;
    const building_id = req.params.building_id; 
    const {room_name, capacity, components} = req.body;

    const room = await Room.findOne({
        where: {
            id: room_id,
            building_id: building_id
        }
    });

    await room.update({
        name: room_name,
        capacity: capacity,
        components: components,
        building_id: building_id
    });

    res.json({message: 'Room updated Successfully', room})
})

//Periods
api.route("/terms/:term_id?")
.get(async (req, res, next) => {

    try {
        const term_id = req.params.term_id

        if(term_id) {
            const termID = await Term.findOne({
                where: {
                    id: term_id
                }
            })

            res.status(201);
            res.json({
                termID
            })
        }
        else {
            const terms = await Term.findAll();

            res.status(200);
            res.json({
                terms
            })
        }
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
})
.post(async (req, res, next) => {
    try {
        const term = new Term({
            term_name: req.body.name,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            term_year: req.body.term_year
        })

        await term.save();

        const terms = await Term.findAll();

        res.status(201).json({
            msg: 'Term saved successfully',
            terms
        })
    }
    catch(e) {
        console.error(e)
    }
})
.delete(async (req, res) => {
    try {
        const id = req.params.term_id;
        await Term.destroy({where: {id}})

        const terms = await Term.findAll();
        res.status(201).json({
            msg: 'Term deleted successfully',
            terms
        })
    }
    catch(e) {
        console.error(e)
    }
})
.put(async (req, res) => {
    try {
        const id = req.params.term_id;
        const {name, term_year, start_date, end_date} = req.body;

        const term = await Term.findOne({
        where: {
            id: id
        }
    });

    await term.update({
        term_name: name,
        start_date: start_date,
        end_date: end_date,
        term_year: term_year
    })

    res.status(201)
    res.json({
        message: 'Term updated successfully',
        term
    });

    }
    catch(e) {
        console.error(e)
        res.status(500).json({ message: 'Internal server error' });
    }
})

//Students
api.route("/students/:major_id/:student_id?")
.get([isAuth],async (req, res, next) => {
    const student_id = req.params.student_id
    const id = req.params.major_id;

    if (student_id) {
        const studentID = await connection.query(`
        SELECT u.first_name as 'first_name',  u.last_name as last_name, 
               m.major_name as major, 
               s.student_id, s.id, u.id as 'user_id'
        FROM users u 
        JOIN students s ON u.id = s.user_id
        JOIN majors m ON s.major = m.id
        WHERE m.id = ${id} AND s.id = ${student_id}
        GROUP BY first_name, last_name, major
        ORDER BY student_id;
    `, {
        type: QueryTypes.SELECT
    });
        res.json({
            studentID
        })
    }
    else {
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
    }
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
})
.put(async (req, res) => {
    try {
        const major_id = req.params.major_id;
        const s_id = req.params.student_id;
        const {first_name, last_name, major, student_id, user_id} = req.body;
    
        const user = await User.findOne({
            where: {
                id: user_id
            }
        })
    
        await user.update({
            first_name: first_name,
            last_name: last_name,
        });
    
        const student = await Student.findOne({
            where: {
                id: s_id
            }
        });

        await student.update({
            major: major_id,
            user_id: user.id,
            student_id: student_id
        });

        res.json({message: 'Student updated successfully', student})
    } 
    catch(e) {
        console.error(e);
        res.status(500).json({message: e});
    }
});

api.route('/faculty/:faculty_id?')
.get(async (req, res) => {
    try {
        const faculty_id = req.params.faculty_id;

        if(faculty_id) {
            const facultyID = await connection.query(`SELECT u.first_name as 'first_name', u.last_name as 'last_name', f.degree as 'professor_degree', f.id
            FROM users u JOIN faculty f ON u.id = f.user_id
            WHERE f.id = ${faculty_id}
            GROUP BY first_name, last_name, professor_degree;`, {
                type: QueryTypes.SELECT
            });
        
            res.status(200);
            res.json({
                facultyID
            })
        }
        else {
            const faculty = await connection.query(`SELECT CONCAT(u.first_name, ' ', u.last_name) as 'professor_name', f.degree as 'professor_degree', f.id
            FROM users u JOIN faculty f ON u.id = f.user_id
            GROUP BY professor_name, professor_degree;`, {
                type: QueryTypes.SELECT
            });
        
            res.status(200);
            res.json({
                faculty
            })
        }
    }
    catch(e) {
        console.error(e);
    }
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

        const schedules = req.body.schedules;

        for (const schedule of schedules) {
            const facultyAvailability = new FacultyAvailability({
                days: schedule.days,
                start_time: schedule.start_time,
                end_time: schedule.end_time,
                faculty_id: faculty.id
            });
            await facultyAvailability.save();
        }

        const faculties = await Faculty.findAll();
        
        res.status(200).json({
            msg: 'Faculty saved successfully',
            faculties
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
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
.put(async (req, res) => {
    try {
        const faculty_id = req.params.faculty_id;
        const { first_name, last_name, degree, schedules } = req.body;

        // Update faculty data
        const user = await User.findOne({
            where: {
                id: req.body.user_id
            }
        });

        await user.update({
            first_name: first_name,
            last_name: last_name
        });

        const faculty = await Faculty.findOne({
            where: {
                id: faculty_id
            }
        });

        await faculty.update({
            degree: degree,
            user_id: user.id
        });

        // Update or create schedules
        for (const schedule of schedules) {
            if (schedule.id) {
                // Update existing schedule
                const existingSchedule = await FacultyAvailability.findOne({
                    where: {
                        id: schedule.id
                    }
                });

                await existingSchedule.update({
                    days: schedule.days,
                    start_time: schedule.start_time,
                    end_time: schedule.end_time
                });
            } else {
                // Create new schedule
                await FacultyAvailability.create({
                    days: schedule.days,
                    start_time: schedule.start_time,
                    end_time: schedule.end_time,
                    faculty_id: faculty_id
                });
            }
        }

        res.json({ message: 'Faculty updated successfully', faculty });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
})


api.route('/faculty/availability/:faculty_id')
.get(async (req, res) => {
    try {
        const faculty_id = req.params.faculty_id

        const availability = await connection.query(`SELECT f.id as 'faculty_id', fa.days as 'days', fa.start_time as 'start_time', fa.end_time as 'end_time'
        FROM faculty f JOIN faculty_availability fa ON f.id = fa.faculty_id
        WHERE f.id = ${faculty_id}
        GROUP BY faculty_id, days, start_time, end_time`, {
            type: QueryTypes.SELECT
        })

        res.status(201)
        res.json({
            availability
        })

    }
    catch(e) {
        console.error(e)
    }
})

api.route('/faculty/course/:faculty_id/:fCourse_id?')
.get(async (req, res) => {
    try {
        const faculty_id = req.params.faculty_id

        const courses = await connection.query(`SELECT fc.id,  c.id as 'course_id', c.course_name as 'course_name', c.credits as 'course_credits', c.code as 'course_code'
        FROM courses c JOIN faculty_courses fc ON c.id = fc.course_id
        JOIN faculty f ON f.id = fc.faculty_id
        WHERE f.id = ${faculty_id}
        GROUP BY course_id, course_name, course_credits, course_code`, {
            type: QueryTypes.SELECT
        });

        res.status(201)
        res.json({
            courses
        })
    }
    catch(e) {

    }
})
.post(async (req, res) => {
    try {
        const faculty_id = req.params.faculty_id
        const courseIDs = req.body['class-option'];

        for(const courseID of courseIDs) {
            const facultyCourse = new FacultyCourse({
                course_id: courseID,
                faculty_id: faculty_id
            });
    
            await facultyCourse.save();
        }

        const facultyCourses = await FacultyCourse.findAll({
            where: {
                faculty_id: faculty_id
            }
        });
    
            res.status(201)
            res.json({
                facultyCourses
            })
    }
    catch (e) {
        console.error(e)
    }
})
.delete(async (req, res) => {
    try {
        const faculty_course_id = req.params.fCourse_id;
        const faculty_id = req.params.faculty_id
    
        await FacultyCourse.destroy({
            where: {
                id: faculty_course_id
            }
        })
    
        const facultyCourses = await FacultyCourse.findAll({
            where: {
                faculty_id: faculty_id
            }
        });
    
            res.status(201)
            res.json({
                facultyCourses
            })
    }
    catch(e) {
        console.error(e)
    }
})

export default api