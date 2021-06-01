import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
export const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    let history = useHistory()
    const changePassword = () => {
        axios.put("http://localhost:3001/auth/changepassword",
            { oldPassword: oldPassword, newPassword: newPassword },
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                },
            }).then((response) => {
                if (response.data.error) {
                    alert(response.data.error)
                }
            })
    }
    return (
        <div>
            <h1>Change Password</h1>
            <input type="text" placeholder="Old Password..." onChange={(e) => { setOldPassword(e.target.value) }} />
            <input type="text" placeholder="New Password..." onChange={(e) => { setNewPassword(e.target.value) }} />
            <button onClick={changePassword}>Save Changes</button>
        </div>
    )
}

export default ChangePassword