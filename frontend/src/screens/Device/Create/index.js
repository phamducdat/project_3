import React, {useState} from 'react';
import NavTop from "../../../layout/components/NavTop/NavTop";
import {CreateDeviceContextProvider, useCreateDeviceContext} from "./context";
import {Lock, User} from "react-feather";

const CreateDeviceImpl = () => {

    const {handleCreateDevice} = useCreateDeviceContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className="">
            <NavTop/>
            <div className="form-create">
                    <form className="sign-in-form">
                        <h2 className="title">Tạo mới thiết bị</h2>
                        <div className="input-field">
                            <User style={{ placeSelf: 'center' }} />
                            <input type="text" placeholder="Username"  value={username} />
                        </div>
                        <div className="input-field">
                            <Lock style={{ placeSelf: 'center' }} />
                            <input type="password" placeholder="Password" value={password} />
                        </div>
                        <input type="submit" value="Tạo mới" className="btn solid" />
                    </form>

            </div>

        </div>
    );
}
const CreateDevice = () => <CreateDeviceContextProvider><CreateDeviceImpl/></CreateDeviceContextProvider>
export default CreateDevice