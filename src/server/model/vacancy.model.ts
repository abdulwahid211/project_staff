import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SequeliseConnection } from '../../../db/sql/config';
import {IVacancies} from '../interfaces/Modelnterfaces'

export interface VacancyInput extends Optional<IVacancies, 'VacancyID'> { }
export interface VacancyOutput extends Required<Vacancy> { }

export class Vacancy extends Model<VacancyInput, VacancyOutput> implements IVacancies {
    public VacancyID!: number;
    public Title!: string;
    public EmployerID!: number;
    public Created!: Date;
    public Description!:string;
}

 Vacancy.init({

    VacancyID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    Title: {
        type: DataTypes.TEXT
    },
    EmployerID: {
        type: DataTypes.INTEGER
    },
    Created: {
        type: DataTypes.DATE
    },
    Description: {
        type: DataTypes.TEXT
    }
},
    {
        sequelize: SequeliseConnection,
        timestamps: false,
        paranoid: false
    })


