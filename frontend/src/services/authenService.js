import { postAsync } from "../constant/request";

export async function login( params ) {
  console.log("params = " , params);
  const url ='http://localhost:3000/users/login'
  const response = await postAsync(url, params)
  return response?.data || []
}
export async function signup( data ) {
  const url = 'http://localhost:3000/users/'
  const response = await postAsync(url, data)
  return response?.data || []
}