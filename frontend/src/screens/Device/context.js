import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {getAllDevice} from "../../services/deviceService";
import {Table} from "antd";


const columns = [
    {
        title: 'Device Name',
        dataIndex: 'deviceName',
        key: 'deviceName',
    },
    {
        title: 'Connect State',
        dataIndex: 'connectState',
        key: 'connectState',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
];


export const DeviceContext = createContext({})

export const useDeviceContext = () => useContext(DeviceContext)


export const DeviceContextProvider = ({children}) => {

    const [test, setTest] = useState("")

    const handleGetAllDevice = async () => {
        console.log("You in DeviceContextProvider")
        const response = await getAllDevice()
        setTest(response.devices)
        return response.devices
        if (response) {
            return response.devices.forEach(device => ({
                name: device.name,
                connectState: device.connectState,
                location: device.location
            }))
        }
    }
    console.log("test = ", test)
    // console.log("handleGetAllDevice() = ", handleGetAllDevice)

    const value = useMemo(() => ({
            handleGetAllDevice
        }),
        [])

    useEffect(() => {
        handleGetAllDevice()
    }, [])

    return (
        <DeviceContext.Provider value={value}>
            {children}
            <div className="deviceTable">
                <Table dataSource={test} columns={columns}/>
            </div>
        </DeviceContext.Provider>
    )
}

