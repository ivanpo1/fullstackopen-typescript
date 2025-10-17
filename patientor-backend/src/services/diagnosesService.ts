import diagnosesData from '../../data/diagnoses.js';

import type { Diagnosis } from '../types.js';

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = () : Diagnosis[] => {
    return diagnoses;
};

const getDiagnoseByCode = (code: string) : Diagnosis | undefined => {
    return diagnoses.find(d => d.code === code);
};

export default {
    getEntries,
    getDiagnoseByCode
};