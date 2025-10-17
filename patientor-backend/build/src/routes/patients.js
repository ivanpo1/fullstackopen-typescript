import express, {} from 'express';
import patientsService from "../services/patientsService.js";
import { entrySchema } from '../types.js';
import { newPatientSchema } from '../types.js';
import { z } from "zod";
const newPatientParser = (req, _res, next) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const newEntryParser = (req, _res, next) => {
    try {
        entrySchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientsService.getPatientById(id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.status(404).send({ error: 'Patient not found' });
    }
});
router.post('/:id/entries', newEntryParser, (req, res) => {
    try {
        const id = req.params.id;
        const addedEntry = patientsService.addEntryToPatient(id, req.body);
        res.json(addedEntry);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(500).send({ error: 'Unknown error occurred' });
        }
    }
});
router.post('/', newPatientParser, (req, res) => {
    try {
        const addedPatient = patientsService.addPatient(req.body);
        res.json(addedPatient);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(500).send({ error: 'Unknown error occurred' });
        }
    }
});
router.use(errorMiddleware);
export default router;
//# sourceMappingURL=patients.js.map