import patientsData from '../../data/patients-full.js';
import {v4 as uuid} from 'uuid';

import {
    type EntryWithoutId,
    type NewPatientEntry,
    type NonSensitivePatient,
    type Patient,
    validatePatient
} from '../types.js';

const patients: Patient[] = patientsData.map(patient =>
    validatePatient({
        ...patient
    }));

const getEntries = (): Patient[] => {
    return patients;
};

const getPatientById = (id: string): Patient | undefined  => {
    return patients.find(patient => patient.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addEntryToPatient = (id: string, entry: EntryWithoutId): Patient => {
    const newEntry = {
        id: uuid(),
        ...entry
    };

    const patient = getPatientById(id);

    if (!patient) {
        throw new Error;
    }

    console.log('Entry', newEntry);

    patient.entries.push(newEntry);

    return patient;
};


const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry,
        entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getPatientById,
    addEntryToPatient
};