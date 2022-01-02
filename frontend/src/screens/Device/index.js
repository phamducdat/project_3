import NavTop from "../../layout/components/NavTop/NavTop";
import {DeviceContextProvider, useDeviceContext} from "./context";
import { Button } from 'antd';
import styles from './style.css'
import {useEffect} from "react";
const DeviceImpl = () => {

    const {handleGetAllDevice} = useDeviceContext();


    console.log("handleGetAllDevice = ", handleGetAllDevice)


    return (
        <>
            <NavTop/>
            {/*<Button onClick={handleGetAllDevice}>hello</Button>*/}
        </>
    )
}

const Device = () => <DeviceContextProvider><DeviceImpl/></DeviceContextProvider>
export default Device