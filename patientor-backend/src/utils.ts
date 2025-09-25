import z from 'zod';

const Gender = z.enum(["male", "female", "other"]);

export const newPatientSchema = z.object({
    name: z.string(),
    ssn: z.string(),
    dateOfBirth: z.string().date(),
    occupation: z.string(),
    gender: Gender,
});

export default newPatientSchema;