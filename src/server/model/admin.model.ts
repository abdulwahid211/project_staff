import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SequeliseConnection } from '../../../db/sql/config';
import {IAdmin} from '../interfaces/Modelnterfaces'

export interface AdminAttributes extends Optional<IAdmin, 'AdminID'> { }

export class Admin extends Model<AdminAttributes> implements IAdmin {
    public AdminID!: number;
    public LastName!: string;
    public FirstName!: string;
    public Email!: string;
    public Password!: string;
}

 Admin.init({
    AdminID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    LastName: {
        type: DataTypes.TEXT
    },
    FirstName: {
        type: DataTypes.TEXT
    },
    Email: {
        type: DataTypes.TEXT
    },
    Password: {
        type: DataTypes.TEXT
    }
},
    {
        sequelize: SequeliseConnection,
        timestamps: false,
        paranoid: false
    })


