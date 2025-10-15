import {z} from 'zod';

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export const BaseEntrySchema = z.object({
    id: z.string(),
    description: z.string().min(1, "Description is required"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),
    specialist: z.string().min(1, "Specialist is required"),
    diagnosisCodes: z.array(z.string()).optional()
});

export const BaseEntryWithoutIdSchema = BaseEntrySchema.omit({ id: true});

export const healthCheckEntrySchema = BaseEntryWithoutIdSchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.enum(HealthCheckRating)
});

export const dischargeSchema = z.object({
    date: z.string(),
    criteria: z.string()
});

export const hospitalEntrySchema = BaseEntryWithoutIdSchema.extend({
    type: z.literal("Hospital"),
    discharge: dischargeSchema
});

export const sickLeaveSchema = z.object({
    startDate: z.string(),
    endDate: z.string()
});

export const occupationalHealthcareEntrySchema = BaseEntryWithoutIdSchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: sickLeaveSchema.optional()
});

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export const PatientSchema = z.object({
    id: z.string(),
    name: z.string(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.enum(Gender),
    dateOfBirth: z.string(),
    entries: z.array(z.any()).default([])
});

export const newPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    dateOfBirth: z.string(),
    occupation: z.string(),
    gender: z.enum([Gender.Male, Gender.Female, Gender.Other])
});

// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// export type EntryWithoutId = UnionOmit<Entry, 'id'>;


export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export const validatePatient = (patientData: unknown): Patient => {
    return PatientSchema.parse(patientData);
};

export const entrySchema = z.discriminatedUnion('type', [
    healthCheckEntrySchema,
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema
]);

export type EntryWithoutId = z.infer<typeof entrySchema>;
export type Entry = EntryWithoutId & { id: string };
