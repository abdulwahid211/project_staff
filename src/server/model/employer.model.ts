import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SequeliseConnection } from '../../../db/sql/config';
import {IEmployer} from '../interfaces/Modelnterfaces'

export interface EmployerInput extends Optional<IEmployer, 'EmployerID'> { }
export interface EmployerOutput extends Required<Employer> { }

export class Employer extends Model<EmployerInput, EmployerOutput> implements IEmployer {
    public EmployerID!: number;
    public Name!: string;
    public Address!: string;
    public City!: string;
    public Postcode!: string;
    public Email!: string;
    public Password!: string;
}

Employer.init({

    EmployerID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.TEXT
    },
    Address: {
        type: DataTypes.TEXT
    },
    City: {
        type: DataTypes.TEXT
    },
    Postcode: {
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


