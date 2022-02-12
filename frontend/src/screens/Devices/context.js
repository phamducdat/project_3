import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toastError, toastSuccess } from "../../constant/toast";
import { addDeviceByIdFetch, deleteDeviceById, getDeviceById, getUserDevices, updateDeviceByIdFetch } from "../../services/devicesServices";

//context
export const DevicesContext = createContext({})

//hook
export const useDevicesContext = () => useContext(DevicesContext)

//provider
export const DevicesContextProvider = ({ children }) => {
  const [listDevices, setListDevices] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [deviceItem, setDeviceItem] = useState()
  const [openAddModal, setOpenAddModal] = useState(false)
  const [currentPosition, setCurrentPosition] = useState([])

  useEffect(() => {
    getListDevices()
    navigator.geolocation.getCurrentPosition(function (pos) {
      setCurrentPosition([...currentPosition, pos?.coords?.latitude])
      setCurrentPosition([...currentPosition, pos?.coords?.longitude])
    })
  }, [])

  const getListDevices = async () => {
    const res = await getUserDevices()
    setListDevices(res?.devices)
  }

  const deleteDevice = async (id) => {
    const res = await deleteDeviceById(id)
    if (!res?.error) {
      toastSuccess("Delete Complete!")
    } else {
      toastError("Delete Incomplete!")
    }
  }

  const updateDevice = async (id, name, state) => {
    let tmp = `{ "deviceName": "${name}", "connectState": "${state}" }`
    let params = JSON.parse(tmp)
    // const res = await updateDeviceById(id, params)
    const res = await updateDeviceByIdFetch(id, params)
    if (!res?.error) {
      toastSuccess("Update Complete!")
      await getListDevices()
      window.location.reload()
    } else {
      toastError("Update Incomplete!")
    }
  }

  const addDevice = async (id, name, state) => {
    
    let tmp = `{ "embedId": "${id}", "deviceName": "${name}", "connectState": "${state}", "location": "${currentPosition}" }`
    let params = JSON.parse(tmp)
    const res = await addDeviceByIdFetch(params)
    console.log('id, name, state', id, name, state, res);
    if (!res?.error) {
      toastSuccess("Add Complete!")
      await getListDevices()
      window.location.reload()
    } else {
      toastError("Add Incomplete!")
    }
  }

  const getDeviceItemById = async (id) => {
    let tmp = await getDeviceById(id)
    if (tmp?.device) setDeviceItem(tmp?.device)
  }

  const value = useMemo(() => ({
    listDevices, getListDevices, deleteDevice, updateDevice, openModal,
    setOpenModal, getDeviceItemById, deviceItem, openAddModal, setOpenAddModal, addDevice
  }),
    // eslint-disable-next-line no-sequences
    [listDevices, openModal, deviceItem, openAddModal])
  return (
    <DevicesContext.Provider value={value}>
      {children}
    </DevicesContext.Provider>
  )
}