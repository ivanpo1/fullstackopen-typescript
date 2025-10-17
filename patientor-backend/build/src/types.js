import { z } from 'zod';
export var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (Gender = {}));
export var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating || (HealthCheckRating = {}));
export const BaseEntrySchema = z.object({
    id: z.string(),
    description: z.string().min(1, "Description is required"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in format YYYY-MM-DD"),
    specialist: z.string().min(1, "Specialist is required"),
    diagnosisCodes: z.array(z.string()).optional()
});
export const BaseEntryWithoutIdSchema = BaseEntrySchema.omit({ id: true });
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
export const validatePatient = (patientData) => {
    return PatientSchema.parse(patientData);
};
export const entrySchema = z.discriminatedUnion('type', [
    healthCheckEntrySchema,
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema
]);
//# sourceMappingURL=types.js.map