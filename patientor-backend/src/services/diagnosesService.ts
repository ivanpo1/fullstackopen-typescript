import diagnosesData from '../../data/diagnoses.js';

import type { DiagnosisEntry } from '../types.js';

const diagnoses: DiagnosisEntry[] = diagnosesData;

const getEntries = () => {
    return diagnoses;
};

export default {
    getEntries
};