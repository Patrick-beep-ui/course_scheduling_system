import {DataTypes} from "sequelize"
import connection from "../connection.js"

const Major = connection.define('Major', {
    major_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: true
    },
    credits: {
       type: DataTypes.BIGINT,
       allowNull: true 
    },
  

}, {
    timestamps: false
}) 

export default Major