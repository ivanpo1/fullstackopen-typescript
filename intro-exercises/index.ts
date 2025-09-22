import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { isNotNumber } from './utils';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        return res.status(400).json({
            error: "parameters missing"
        });
    }

    if (!Array.isArray(daily_exercises)) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    if (!daily_exercises.every(hour => !isNotNumber(hour))) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    if (isNotNumber(target)) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.json(calculateExercises(target, daily_exercises));
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

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