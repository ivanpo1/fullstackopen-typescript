import { z } from 'zod';
import type newPatientSchema from "./utils.js";

export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientEntry {
    "id": string,
    "name": string,
    "dateOfBirth": string,
    "ssn": string,
    "gender": string,
    "occupation": string
}

// export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;