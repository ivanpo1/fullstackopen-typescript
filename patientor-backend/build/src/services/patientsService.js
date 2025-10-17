import patientsData from '../../data/patients-full.js';
import { v4 as uuid } from 'uuid';
import { validatePatient } from '../types.js';
const patients = patientsData.map(patient => validatePatient(Object.assign({}, patient)));
const getEntries = () => {
    return patients;
};
const getPatientById = (id) => {
    return patients.find(patient => patient.id === id);
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const addEntryToPatient = (id, entry) => {
    const newEntry = Object.assign({ id: uuid() }, entry);
    const patient = getPatientById(id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    patient.entries.push(newEntry);
    return patient;
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign(Object.assign({ id: uuid() }, entry), { entries: [] });
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
//# sourceMappingURL=patientsService.js.map