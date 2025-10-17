import { z } from 'zod';
export declare enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}
export declare enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
export declare const BaseEntrySchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const BaseEntryWithoutIdSchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const healthCheckEntrySchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"HealthCheck">;
    healthCheckRating: z.ZodEnum<typeof HealthCheckRating>;
}, z.core.$strip>;
export declare const dischargeSchema: z.ZodObject<{
    date: z.ZodString;
    criteria: z.ZodString;
}, z.core.$strip>;
export declare const hospitalEntrySchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"Hospital">;
    discharge: z.ZodObject<{
        date: z.ZodString;
        criteria: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const sickLeaveSchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
}, z.core.$strip>;
export declare const occupationalHealthcareEntrySchema: z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"OccupationalHealthcare">;
    employerName: z.ZodString;
    sickLeave: z.ZodOptional<z.ZodObject<{
        startDate: z.ZodString;
        endDate: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[];
}
export declare const PatientSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    ssn: z.ZodString;
    occupation: z.ZodString;
    gender: z.ZodEnum<typeof Gender>;
    dateOfBirth: z.ZodString;
    entries: z.ZodDefault<z.ZodArray<z.ZodAny>>;
}, z.core.$strip>;
export declare const newPatientSchema: z.ZodObject<{
    name: z.ZodString;
    ssn: z.ZodString;
    dateOfBirth: z.ZodString;
    occupation: z.ZodString;
    gender: z.ZodEnum<{
        male: Gender.Male;
        female: Gender.Female;
        other: Gender.Other;
    }>;
}, z.core.$strip>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = z.infer<typeof newPatientSchema>;
export declare const validatePatient: (patientData: unknown) => Patient;
export declare const entrySchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"HealthCheck">;
    healthCheckRating: z.ZodEnum<typeof HealthCheckRating>;
}, z.core.$strip>, z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"Hospital">;
    discharge: z.ZodObject<{
        date: z.ZodString;
        criteria: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    description: z.ZodString;
    date: z.ZodString;
    specialist: z.ZodString;
    diagnosisCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    type: z.ZodLiteral<"OccupationalHealthcare">;
    employerName: z.ZodString;
    sickLeave: z.ZodOptional<z.ZodObject<{
        startDate: z.ZodString;
        endDate: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>], "type">;
export type EntryWithoutId = z.infer<typeof entrySchema>;
export type Entry = EntryWithoutId & {
    id: string;
};
//# sourceMappingURL=types.d.ts.map