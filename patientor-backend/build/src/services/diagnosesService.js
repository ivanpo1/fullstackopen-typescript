import diagnosesData from '../../data/diagnoses.js';
const diagnoses = diagnosesData;
const getEntries = () => {
    return diagnoses;
};
const getDiagnoseByCode = (code) => {
    return diagnoses.find(d => d.code === code);
};
export default {
    getEntries,
    getDiagnoseByCode
};
//# sourceMappingURL=diagnosesService.js.map