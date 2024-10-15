import { Outlet } from "react-router-dom"

export const AccountPage = () => {
    return (
        <>
        <Outlet />
        </>
    )
}

export const DashBoard = () => {
    return <div>DashBoard</div>
}


export const Profile = () => {
    return <div>Profile</div>
}


export const Settings = () => {
    return <div>Setting</div>
}