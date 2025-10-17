import { type EntryWithoutId, type NewPatientEntry, type NonSensitivePatient, type Patient } from '../types.js';
declare const _default: {
    getEntries: () => Patient[];
    getNonSensitiveEntries: () => NonSensitivePatient[];
    addPatient: (entry: NewPatientEntry) => Patient;
    getPatientById: (id: string) => Patient | undefined;
    addEntryToPatient: (id: string, entry: EntryWithoutId) => Patient;
};
export default _default;
//# sourceMappingURL=patientsService.d.ts.map