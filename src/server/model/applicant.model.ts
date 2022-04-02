import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SequeliseConnection } from '../../../db/sql/config';
import {IApplicants} from '../interfaces/applicantInterfaces'

export interface ApplicantInput extends Optional<IApplicants, 'ApplicantID'> { }
export interface ApplicantOutput extends Required<Applicants> { }

export class Applicants extends Model<ApplicantInput, ApplicantOutput> implements IApplicants {
    public ApplicantID!: number;
    public LastName!: string;
    public FirstName!: string;
    public Address!: string;
    public City!: string;
    public Postcode!: string;
    public Email!: string;
    public Password!: string;
}

 Applicants.init({

    ApplicantID: {
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
    Address: {
        type: DataTypes.TEXT
    },
    City: {
        type: DataTypes.TEXT
    },
    Email: {
        type: DataTypes.TEXT
    },
    Postcode: {
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


