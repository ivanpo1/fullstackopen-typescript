import axios from 'axios'
import type {Diary, newDiary} from "../types.ts";

const baseUrl = 'http://localhost:3000/api/diaries'

const getAllDiaries = async () => {
    const res = await axios.get<Diary[]>(baseUrl)
    return res.data
}

const createDiary = async (object: newDiary) => {
    const res = await axios.post<Diary>(baseUrl, object)
    return res.data
}

export default {
    getAllDiaries,
    createDiary
}