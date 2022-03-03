import { Dialect, Sequelize } from 'sequelize'
import {DbConfig} from "./dbConfig";

const dbDriver = DbConfig.DRIVER as Dialect

export const SequeliseConnection = new Sequelize(DbConfig.DB, DbConfig.USER, DbConfig.PASSWORD, {
    host: DbConfig.HOST,
    dialect:dbDriver
})
