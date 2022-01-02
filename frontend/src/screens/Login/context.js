import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastError, toastSuccess } from "../../constant/toast";
import { signup, login } from "../../services/authenService";


//context
export const LoginContext = createContext({})

//hook
export const useLoginContext = () => useContext(LoginContext)

//provider
export const LoginContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const handleSignup = async (username, password) => {
    let tmp = `{ "username": "${username}", "password": "${password}" }`
    let params = JSON.parse(tmp)
    if (username && password) {
      const response = await signup(params)
      if (response?.password) {
        console.log(`response?.password`, response?.password)
        toastSuccess("Success Notification !")
        navigate('/')
      }
      else
        toastError(response?.error)
    }
    else {
      toastError("Error")
    }
  }

  const handleLogin = async (username, password) => {
    let tmp = `{ "username":"${username}", "password":"${password}" }`
    let params = JSON.parse(tmp)
    if (username && password) {
      console.log(`username`, username)
      const response = await login(params)
      console.log("response in handle= ", response)
      if (response?.password) {
        console.log(`response?.password`, response?.password)
        toastSuccess("Success Notification !")
        navigate('/')
      }
      else
        toastError(response?.error)
    }
    else {
      toastError("Error")
    }
  }


  const value = useMemo(() => ({
    handleSignup, handleLogin
  }),
    [])
  return (
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  )
}
