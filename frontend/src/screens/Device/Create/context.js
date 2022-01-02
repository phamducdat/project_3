import React, {Component, createContext, useContext, useEffect, useMemo, useState} from 'react';
import {createDevice, getAllDevice} from "../../../services/deviceService";
import {Table} from "antd";
import {DeviceContext} from "../context";
import async from "async";
import {toastError, toastSuccess} from "../../../constant/toast";

export const CreateDeviceContext = createContext({})

export const useCreateDeviceContext = () => useContext(CreateDeviceContext)

export const CreateDeviceContextProvider = ({children}) => {
    const handleCreateDevice = async (params) => {
        console.log("params = ", params)
        if (params) {
            const response = await createDevice(params)
            if (response){
                console.log("response = ", response)
                // toastSuccess("Thành công");
            }else {
                // toastError("Thất bại")
            }
        }
    }

    const value = useMemo(() => ({
        handleCreateDevice
    }), [])

    return (
        <DeviceContext.Provider value={value} >
            {children}
        </DeviceContext.Provider>
    )
}
