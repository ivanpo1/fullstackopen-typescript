import express from 'express';
import calculateBmi from './bmiCalculator';
import {isNotNumber} from './utils';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const height = _req.query.height;
    const weight = _req.query.weight;

    if (isNotNumber(height) || isNotNumber(weight) || !height || !weight) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    return res.json({
        weight: weight,
        height: height,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});