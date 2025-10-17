import express, { type Request, type Response, type NextFunction } from 'express';
import patientsService from "../services/patientsService.js";
import {
    type NewPatientEntry,
    type NonSensitivePatient,
    type Patient,
    type EntryWithoutId,
    entrySchema
} from '../types.js';
import { newPatientSchema } from '../types.js';
import { z } from "zod";

const newPatientParser = ( req: Request, _res: Response, next: NextFunction ) => {
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = ( req: Request, _res: Response, next: NextFunction ) => {
    try {
        entrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = ( error: unknown, _req: Request, res: Response, next: NextFunction ) => {
    if ( error instanceof z.ZodError ) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

const router = express.Router();

router.get('/', ( _req, res: Response<NonSensitivePatient[]> ) => {
    res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', ( req, res: Response<NonSensitivePatient | { error: string }> ) => {
    const id = req.params.id;
    const patient = patientsService.getPatientById(id);

    if ( patient ) {
        res.send(patient);
    } else {
        res.status(404).send({error: 'Patient not found'});
    }
});

router.post('/:id/entries', newEntryParser, ( req: Request<{
    id: string
}, unknown, EntryWithoutId>, res: Response<Patient | { error: string }> ) => {

    try {
        const id = req.params.id;
        const addedEntry = patientsService.addEntryToPatient(id, req.body);
        res.json(addedEntry);
    } catch (error: unknown) {
        if ( error instanceof Error ) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Unknown error occurred' });
        }
    }
});

router.post('/', newPatientParser, ( req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient | {
    error: string
}> ) => {
    try {
        const addedPatient = patientsService.addPatient(req.body);
        res.json(addedPatient);
    } catch (error: unknown) {
        if ( error instanceof Error ) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(500).send({ error: 'Unknown error occurred' });
        }
    }
});

router.use(errorMiddleware);


export default router;