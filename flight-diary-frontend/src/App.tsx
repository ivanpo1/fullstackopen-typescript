import {useEffect, useState} from 'react'
import './App.css'
import type {Diary, newDiary} from "./types.ts";
import DiaryForm from "./components/DiaryForm.tsx";
import diaryService from './services/diaryService';
import axios from 'axios';

function App() {
    const [diaries, setDiaries] = useState<Diary[]>([])
    const [notification, setNotification] = useState<string | null>(null)

    const showNotification = (message: string) => {
        setNotification(message)
        setTimeout(() => setNotification(null), 5000)
    }

    useEffect(() => {
        diaryService.getAllDiaries().then(data => setDiaries(data))
    }, [])

    const createDiary = async (diaryObject: newDiary): Promise<newDiary> => {
        try {
            const createdDiary = await diaryService.createDiary(diaryObject)
            setDiaries(diaries.concat(createdDiary))
            return createdDiary
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.status)
                const errorMessage = error.response?.data || error.message
                showNotification(errorMessage)
            } else {
                console.error(error)
                showNotification('Error: ' + error)
            }
            throw new Error('Everything failed')
        }
    }

    return (
        <div>
            <p>{notification}</p>
            <div>
                <DiaryForm createDiary={createDiary} />
            </div>
            <h3>Diary Entries:</h3>
            {diaries.map(diary =>
                <div key={diary.id}>
                    <p>{diary.date}</p>
                    <p>{diary.visibility}</p>
                    <p>{diary.weather}</p>
                </div>
            )}
        </div>
    )
}

export default App
