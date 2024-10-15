import { useState } from "react"
import AuthForm from "../UI/AuthForm"

export const AuthFormPage = ({signup=false}) => {
    const [signupMode, setSignupMode] = useState(signup)
    const toggleHandler = () => {
        setSignupMode(prevMode => !prevMode)
    }
    return <AuthForm signupMode={signupMode} toggleHandler={toggleHandler}/>
}