CREATE DATABASE scheduleDB;

use scheduleDB;

CREATE TABLE students(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(20),
last_name VARCHAR(20),
email VARCHAR(50),
major VARCHAR(20)
);

ALTER TABLE students
MODIFY COLUMN major BIGINT NOT NULL;

ALTER TABLE students
ADD FOREIGN KEY (major) REFERENCES majors(id);

CREATE TABLE courses(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
code VARCHAR(20) NOT NULL,
credits TINYINT NOT NULL,
prerequisite INT NOT NULL
);

ALTER TABLE courses
MODIFY COLUMN prerequisite INT NULL;

ALTER TABLE courses
ADD FOREIGN KEY (prerequisite) REFERENCES courses(id);

ALTER TABLE courses 
ADD COLUMN course_name VARCHAR(100) NOT NULL;

ALTER TABLE courses MODIFY COLUMN prerequisite INT NULL DEFAULT null;

CREATE TABLE faculty(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(20),
last_name VARCHAR(20),
email VARCHAR(50),
degree VARCHAR(50)
);

CREATE TABLE terms(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(20),
start_date DATE NOT NULL,
end_date DATE NOT NULL
);

ALTER TABLE terms MODIFY COLUMN name ENUM('Spring', 'Fall', 'Summer');
ALTER TABLE terms ADD COLUMN term_year VARCHAR(10);

CREATE TABLE rooms(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
capacity INT,
components VARCHAR(255)
);

CREATE TABlE majors(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(20),
degree VARCHAR(50),
credits BIGINT
);

ALTER TABLE majors
MODIFY column degree VARCHAR(30);

ALTER TABLE majors
CHANGE COLUMN name major_name VARCHAR(60);

ALTER TABLE courses
ADD COLUMN major BIGINT;

ALTER TABLE courses
ADD FOREIGN KEY (major) REFERENCES majors(id);

CREATE TABLE period_courses(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
period_id BIGINT NOT NULL,
course_id INT NOT NULL,
faculty_id BIGINT NOT NULL,
room_id BIGINT NOT NULL,
 start_date DATE,
 end_date DATE,
 days VARCHAR(5), 
 start_time TIME,
 end_time TIME
);

ALTER TABLE period_courses
ADD FOREIGN KEY (period_id) REFERENCES periods(id),
ADD FOREIGN KEY (course_id) REFERENCES courses(id),
ADD FOREIGN KEY (faculty_id) REFERENCES faculty(id),
ADD FOREIGN KEY (room_id) REFERENCES rooms(id);

CREATE TABLE student_schedules(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
student_id BIGINT NOT NULL,
period_course_id BIGINT NOT NULL,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE student_schedules
ADD FOREIGN KEY (student_id) REFERENCES students(id),
ADD FOREIGN KEY (period_course_id) REFERENCES period_courses(id);

ALTER TABLE student_schedules ADD COLUMN delivery ENUM('Not Online', 'Online', 'Hybrid');
ALTER TABLE student_schedules MODIFY COLUMN delivery ENUM('Not Online', 'Online', 'Hybrid') NULL;
ALTER TABLE student_schedules ADD COLUMN section VARCHAR(10) NULL;

CREATE TABLE users(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(20),
last_name VARCHAR(20),
username VARCHAR(255) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM('admin', 'registar') NOT NULL
);

ALTER TABLE users
MODIFY COLUMN first_name VARCHAR(20) NOT NULL,
MODIFY COLUMN last_name VARCHAR(20) NOT NULL;

ALTER TABLE users ADD COLUMN role ENUM('admin', 'registar') NULL;

ALTER TABLE users
MODIFY COLUMN username VARCHAR(50) NULL,
MODIFY COLUMN email VARCHAR(50) NULL,
MODIFY COLUMN password VARCHAR(50) NULL;

SELECT * FROM majors;

INSERT INTO majors(major_name, degree, credits)
VALUES('Software Engineering', 'Bachelor of Science', 256),
('Business Administration', 'Bachelor of Arts', 255);

CREATE TABLE faculty_courses(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
course_id INT,
faculty_id BIGINT
);

ALTER TABLE faculty_courses ADD FOREIGN KEY (course_id) REFERENCES courses(id);
ALTER TABLE faculty_courses ADD FOREIGN KEY (faculty_id) REFERENCES faculty(id);


SELECT * FROM courses;

ALTER TABLE periods RENAME TO terms;
ALTER TABLE period_courses RENAME TO term_courses; 

CREATE TABLE buildings(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
building_name VARCHAR(20)
);

ALTER TABLE rooms ADD COLUMN building_id INT NULL;
ALTER TABLE rooms ADD FOREIGN KEY (building_id) REFERENCES buildings(id);

ALTER TABLE term_courses DROP FOREIGN KEY term_courses_ibfk_3;
ALTER TABLE term_courses DROP COLUMN faculty_id;

ALTER TABLE term_courses DROP FOREIGN KEY term_courses_ibfk_2;

ALTER TABLE term_courses ADD FOREIGN KEY (course_id) REFERENCES faculty_courses(id);

SELECT CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'term_courses' AND COLUMN_NAME = 'course_id';

CREATE TABLE faculty_availability(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
days VARCHAR(30),
start_time DATE,
end_time DATE,
faculty_id BIGINT
);

ALTER TABLE faculty_availability ADD FOREIGN KEY (faculty_id) REFERENCES faculty(id);

ALTER TABLE faculty_availability MODIFY COLUMN start_time VARCHAR(30),
MODIFY COLUMN end_time VARCHAR(30);

CREATE TABLE term_students

/*Drop Enum*/
SELECT * FROM users;

ALTER TABLE users DROP COLUMN role;

SELECT * FROM students;
SELECT * FROM faculty;

ALTER TABLE students 
DROP COLUMN first_name,
DROP COLUMN last_name, 
DROP COLUMN email;

ALTER TABLE faculty 
DROP COLUMN first_name,
DROP COLUMN last_name, 
DROP COLUMN email;

ALTER TABLE students ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE students 
ADD FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE faculty ADD COLUMN user_id BIGINT NOT NULL;

ALTER TABLE faculty 
ADD FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE course_completion(
id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
student_id BIGINT,
course_id BIGINT,
completion_date DATE NULL
);

ALTER TABLE course_completion MODIFY COLUMN course_id INT;

ALTER TABLE course_completion ADD FOREIGN KEY (student_id) REFERENCES students(id);
ALTER TABLE course_completion ADD FOREIGN KEY (course_id) REFERENCES courses(id);

CREATE TABLE term_enrollment(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
term_id BIGINT,
student_id BIGINT
); 

ALTER TABLE term_enrollment ADD FOREIGN KEY (term_id) REFERENCES terms(id);
ALTER TABLE term_enrollment ADD FOREIGN KEY (student_id) REFERENCES students(id);

INSERT INTO courses(code, credits, prerequisite, major, course_name)
VALUES('COP1035C', 4, null, 3, 'Python Programming'),
('COP1800C', 4, null, 3, 'Java Programming'),
('CST1305C', 3, null, 3, 'Essentials of Networking');

INSERT INTO courses(code, credits, prerequisite, major, course_name)
VALUES('COP1810D', 4, null, 6, 'Intro to logical analysis');

INSERT INTO courses(code, credits, prerequisite, major, course_name)
VALUES('8559HZ', 4, null, 4, 'Introduction to Marketing');

SHOW TABLES;
SELECT * FROM courses;
SELECT * FROM majors;
SELECT * FROM faculty;
SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM rooms;
SELECT * FROM terms;
SELECT * FROM buildings;
SELECT * FROM term_enrollment;

DESCRIBE terms;
DESCRIBE rooms;
DESCRIBE buildings;

ALTER TABLE students
ADD COLUMN student_id BIGINT NOT NULL;

SELECT CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'students' AND COLUMN_NAME = 'id';

INSERT INTO users(first_name, last_name, username, email, password)
VALUES('Patrick', 'Solis', 'P.SolisObregon', 'P.SolisObregon@student.keiseruniversity.edu', 'patrick18');

/*Select all students from Software Major*/
SELECT CONCAT(u.first_name, ' ', u.last_name) as 'student_name', m.major_name as 'major', s.student_id as 'student_id'
FROM users u JOIN students s ON u.id = s.user_id
JOIN majors m ON s.major = m.id
WHERE m.id = 3
GROUP BY student_name, major
ORDER BY student_id;

/*Select all students by major*/
SELECT CONCAT(u.first_name, ' ', u.last_name) as 'student_name', m.major_name as 'major', s.student_id as 'student_id'
FROM users u JOIN students s ON u.id = s.user_id
JOIN majors m ON s.major = m.id
GROUP BY student_name, major
ORDER BY major;


SELECT * FROM faculty;
SELECT * FROM users;
SELECT * FROM courses;

/*Select Faculty*/
SELECT CONCAT(u.first_name, ' ', u.last_name) as 'professor_name', f.degree as 'professor_degree'
FROM users u JOIN faculty f ON u.id = f.user_id
GROUP BY professor_name, professor_degree;

SELECT f.id as 'faculty_id', fa.days as 'days', fa.start_time as 'start_time', fa.end_time as 'end_time'
FROM faculty f JOIN faculty_availability fa ON f.id = fa.faculty_id
WHERE f.id = 10
GROUP BY faculty_id, days, start_time, end_time;

/*Select courses by Major*/
SELECT * FROM courses;
SELECT * FROM majors;

SELECT c.code as 'course_code', c.course_name as 'course_name', m.major_name as 'major'
FROM courses c JOIN majors m ON c.major = m.id
GROUP BY course_code, major
ORDER BY major;

/*Select Professor Courses*/
SELECT c.id as 'course_id', c.course_name as 'course_name', c.credits as 'course_credits', c.code as 'course_code'
FROM courses c JOIN faculty_courses fc ON c.id = fc.course_id
JOIN faculty f ON f.id = fc.faculty_id
WHERE f.id = 10
GROUP BY course_id, course_name, course_credits, course_code;

SELECT s.id as 'id', CONCAT(u.first_name, ' ', u.last_name) as 'student_name', m.major_name as 'major', s.student_id as 'student_id', m.id as 'major_id'
FROM users u JOIN students s ON u.id = s.user_id
JOIN majors m ON s.major = m.id
GROUP BY student_name, major
ORDER BY major;

SELECT tm.id as 't_id', CONCAT(u.first_name, ' ', u.last_name) as 'student_name', m.major_name as 'major', s.student_id as 'student_id', t.term_name as 'term_name'
FROM students s JOIN term_enrollment tm ON s.id = tm.student_id
JOIN users u ON s.user_id = u.id
JOIN majors m ON s.major = m.id
JOIN terms t ON t.id = tm.term_id
WHERE t.id = 1
GROUP BY t_id, student_name, major, student_id, term_name;

/*Get Courses that have a professor assigned*/
SELECT fc.id as 'fc_id', c.code as 'course_code', c.course_name as 'course_name', CONCAT(u.first_name, ' ', u.last_name) as 'faculty_name'
FROM users u JOIN faculty f ON u.id = f.user_id
JOIN faculty_courses fc ON fc.faculty_id = f.id
JOIN courses c ON c.id = fc.course_id
GROUP BY fc_id, course_code, course_name, faculty_name; 

/*Get rooms by building*/
SELECT r.id as 'room_id', r.name as 'room_name', r.capacity as 'room_capacity', r.components as 'room_components', b.building_name as 'building'
FROM rooms r JOIN buildings b ON r.building_id = b.id
GROUP BY room_id, room_name, room_capacity, room_components, building;

SELECT tc.id as 'term_course_id', c.code as 'course_code', c.credits as 'course_credits', c.course_name as 'course_name', CONCAT(u.first_name, ' ', u.last_name) as 'professor_name', t.id as 'term_id'
FROM term_courses tc JOIN faculty_courses fc ON tc.course_id = fc.id
JOIN terms t ON t.id = tc.term_id
JOIN courses c ON c.id = fc.course_id
JOIN faculty f ON f.id = fc.faculty_id
JOIN users u ON u.id = f.user_id
WHERE t.id = 1
GROUP BY term_course_id, course_code, course_credits, course_name, professor_name, term_id;

SELECT tc.id as 'term_course_id', tc.days as 'course_days', tc.start_time as 'start_time', tc.end_time as 'end_time', b.building_name as 'building', r.name as 'room_name', c.code as 'course_code', c.course_name as 'course_name', CONCAT(u.first_name, ' ', u.last_name) as 'professor_name', c.credits as 'course_credits', tc.start_date as 'start_date', tc.end_date as 'end_date'
FROM term_courses tc JOIN faculty_courses fc ON tc.course_id = fc.id
JOIN rooms r ON tc.room_id = r.id
JOIN buildings b ON b.id = r.building_id
JOIN terms t ON t.id = tc.term_id
JOIN courses c ON c.id = fc.course_id
JOIN faculty f ON f.id = fc.faculty_id
JOIN users u ON u.id = f.user_id
WHERE t.id = 1
GROUP BY term_course_id, course_code, course_credits, course_name, professor_name, term_id;

/*Get Student Schedule*/

SELECT sc.id as 'student_schedule_id', tc.days as 'course_days', tc.start_time as 'start_time', tc.end_time as 'end_time', b.building_name as 'building', r.name as 'room_name', c.code as 'course_code', c.course_name as 'course_name', CONCAT(u.first_name, ' ', u.last_name) as 'professor_name', c.credits as 'course_credits', tc.start_date as 'start_date', tc.end_date as 'end_date'
        FROM term_courses tc JOIN faculty_courses fc ON tc.course_id = fc.id
        JOIN student_schedules sc ON sc.period_course_id = tc.id
        JOIN students s ON sc.student_id = s.id
        JOIN rooms r ON tc.room_id = r.id
        JOIN buildings b ON b.id = r.building_id
        JOIN terms t ON t.id = tc.term_id
        JOIN courses c ON c.id = fc.course_id
        JOIN faculty f ON f.id = fc.faculty_id
        JOIN users u ON u.id = f.user_id
        WHERE t.id = 1 AND s.id = 29
        GROUP BY student_schedule_id, course_code, course_credits, course_name, professor_name, term_id
        ORDER BY start_time, end_time;
        
SELECT s.id as 'student_id', sc.id as 'student_schedule_id', tc.days as 'course_days', tc.start_time as 'start_time', tc.end_time as 'end_time', b.building_name as 'building', r.name as 'room_name', c.code as 'course_code', c.course_name as 'course_name', CONCAT(u.first_name, ' ', u.last_name) as 'professor_name', c.credits as 'course_credits', tc.start_date as 'start_date', tc.end_date as 'end_date'
        FROM term_courses tc JOIN faculty_courses fc ON tc.course_id = fc.id
        JOIN student_schedules sc ON sc.period_course_id = tc.id
        JOIN students s ON sc.student_id = s.id
        JOIN rooms r ON tc.room_id = r.id
        JOIN buildings b ON b.id = r.building_id
        JOIN terms t ON t.id = tc.term_id
        JOIN courses c ON c.id = fc.course_id
        JOIN faculty f ON f.id = fc.faculty_id
        JOIN users u ON u.id = f.user_id
        WHERE t.id = 1
        GROUP BY student_id, course_code, course_credits, course_name, professor_name, term_id
        ORDER BY student_id, start_time, end_time;
        
SELECT DISTINCT sc.student_id as 's_id', s.student_id as 'student_id', CONCAT(u.first_name, ' ', u.last_name) as 'student_name', sum(c.credits) as 'total_credits'
FROM student_schedules sc JOIN students s ON s.id = sc.student_id
JOIN users u ON u.id = s.user_id
JOIN term_courses tc ON tc.id = sc.period_course_id
JOIN faculty_courses fc ON fc.id = tc.course_id
JOIN courses c ON c.id = fc.course_id
GROUP BY s_id, student_id, student_name;

SELECT tc.id as 'term_course_id', c.code as 'course_code', c.credits as 'course_credits', c.course_name as 'course_name', CONCAT(u.first_name, ' ', u.last_name) as 'professor_name', t.id as 'term_id', count(sc.id) as 'qtyOfStudents'
        FROM term_courses tc JOIN faculty_courses fc ON tc.course_id = fc.id
        JOIN student_schedules sc ON sc.period_course_id = tc.id
        JOIN terms t ON t.id = tc.term_id
        JOIN courses c ON c.id = fc.course_id
        JOIN faculty f ON f.id = fc.faculty_id
        JOIN users u ON u.id = f.user_id
        WHERE t.id = 1
        GROUP BY term_course_id, course_code, course_credits, course_name, professor_name, term_id;

SELECT * FROM term_courses;




SELECT * FROM users;

SHOW TABLES;

DESCRIBE users;
ALTER TABLE users
MODIFY COLUMN password VARCHAR(100);
SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM faculty;
SELECT * FROM rooms;
SELECT * FROM faculty_courses;
SELECT * FROM faculty_availability;
SELECT * FROM student_schedules;
SELECT * FROM term_courses;
DESCRIBE courses;
DESCRIBE faculty;
DESCRIBE faculty_availability;

DELETE FROM student_schedules WHERE id >= 2;
ALTER TABLE student_schedules AUTO_INCREMENT = 1;


/*
DELETE FROM faculty_availability WHERE id >= 4;
ALTER TABLE faculty_availability AUTO_INCREMENT = 4;
*/

Insert into faculty_availability(days, start_time, end_time, faculty_id)
values('MWF', '8:00 am', '11:00 am', 10),
('MWF', '1:00 pm', '4:00 pm', 10);

/*
DELETE FROM users WHERE id > 51;
DELETE FROM users WHERE id = 32;
*/

/*
DELETE FROM rooms WHERE id >= 1;
ALTER TABLE rooms AUTO_INCREMENT = 1;
*/

SELECT * FROM users;
ALTER TABLE users ADD COLUMN session_token varchar(255);