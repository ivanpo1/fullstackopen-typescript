import patientsData from '../../data/patients.js';
import {v4 as uuid} from 'uuid';

import type {NewPatientEntry, NonSensitivePatientEntry, PatientEntry} from '../types.js';

const patients: PatientEntry[] = patientsData;

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};