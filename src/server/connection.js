import {Sequelize} from "sequelize";

const connection = new Sequelize("scheduleDB", "root", "", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

const testConnection = async () => {
    try {
        await connection.authenticate();
        console.log("Authenticated successfully")
    }
    catch(err) {
        console.error('Unable to connect to the database: ' + err.message)
    }
}

testConnection();

export default connection