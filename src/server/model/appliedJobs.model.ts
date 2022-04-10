import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SequeliseConnection } from '../../../db/sql/config';
import { IAppliedJobs } from '../interfaces/Modelnterfaces'

export interface AppliedJobsInput extends Optional<IAppliedJobs, 'AppliedJobsID'> { }
export interface AppliedJobsOutput extends Required<AppliedJobs> { }

export class AppliedJobs extends Model<AppliedJobsInput, AppliedJobsOutput> implements IAppliedJobs {
    public AppliedJobsID!: number;
    public ApplicantID!: number;
    public VacancyID!: number;
}

AppliedJobs.init({

    AppliedJobsID: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    ApplicantID: {
        type: DataTypes.INTEGER
    },
    VacancyID: {
        type: DataTypes.INTEGER
    }
},
    {
        sequelize: SequeliseConnection,
        timestamps: false,
        paranoid: false
    })


