import {getAsync, postAsync} from "../constant/request";

export async function getAllDevice() {
    console.log("params in getAllDevice = ")
    const url = 'http://localhost:3000/devices/'
    const response = await getAsync(url)
    return response?.data || []
}

export async function createDevice(params) {
    console.log("params = ", params)
    const url = 'http://localhost:3000/users/61d1773018d9b11198f93333/devices'
    const response = await postAsync(url, params)
    return response?.data || []
}