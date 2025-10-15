import React, {useState} from "react";
import type {newDiary, Visibility, Weather} from "../types.ts";

interface DiaryFormProps {
    createDiary: (diary: newDiary) => Promise<newDiary>;
}

const DiaryForm = ({ createDiary }: DiaryFormProps) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState<Visibility | null>(null)
    const [weather, setWeather] = useState<Weather | null>(null)
    const [comment, setComment] = useState('')

    const addDiary = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (!weather || !visibility) {
            console.log('No weather or visibility selection')
            return
        }
        try {
            const diaryObject = { date, visibility, weather, comment }
            await createDiary(diaryObject)
            setDate('')
            setVisibility(null)
            setWeather(null)
            setComment('')
        } catch (error) {
            console.error('Failed to create Diary', error)
        }
    }

    return (
        <form onSubmit={addDiary}>
            <div>
                date:
                <label htmlFor="date">date:</label>

                <input
                    type="date"
                    id="date"
                    aria-label="date"
                    value={date}
                    onChange={({target}) => setDate(target.value)}
                />
            </div>
            <div>
                <label>Visibility: </label>
                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="great"
                        checked={visibility === 'great'}
                        onChange={() => setVisibility('great')}
                    />
                    Great
                </label>

                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="good"
                        checked={visibility === 'good'}
                        onChange={() => setVisibility('good')}
                    />
                    Good
                </label>

                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="ok"
                        checked={visibility === 'ok'}
                        onChange={() => setVisibility('ok')}
                    />
                    Ok
                </label>

                <label>
                    <input
                        type="radio"
                        name="visibility"
                        value="poor"
                        checked={visibility === 'poor'}
                        onChange={() => setVisibility('poor')}
                    />
                    Poor
                </label>
            </div>
            <div>
                <label>Weather: </label>
                <label>
                    <input
                        type="radio"
                        name="weather"
                        value="sunny"
                        checked={weather === 'sunny'}
                        onChange={() => setWeather('sunny')}
                    />
                    Sunny
                </label>

                <label>
                    <input
                        type="radio"
                        name="weather"
                        value="rainy"
                        checked={weather === 'rainy'}
                        onChange={() => setWeather('rainy')}
                    />
                    Rainy
                </label>

                <label>
                    <input
                        type="radio"
                        name="weather"
                        value="cloudy"
                        checked={weather === 'cloudy'}
                        onChange={() => setWeather('cloudy')}
                    />
                    Cloudy
                </label>

                <label>
                    <input
                        type="radio"
                        name="weather"
                        value="stormy"
                        checked={weather === 'stormy'}
                        onChange={() => setWeather('stormy')}
                    />
                    Stormy
                </label>

                <label>
                    <input
                        type="radio"
                        name="weather"
                        value="windy"
                        checked={weather === 'windy'}
                        onChange={() => setWeather('windy')}
                    />
                    Windy
                </label>
            </div>
            <div>
                comment:
                <input
                    aria-label="comment"
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
            </div>
            <button type="submit">add Diary</button>
        </form>
    )
}

export default DiaryForm