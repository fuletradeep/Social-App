import React,{useState, createContext} from 'react'

export const ProfileContext = createContext(0)

export const ProfileProvider = ({children}) => {
    const [incrementer, setincrementer] = useState(0)
    return(
        <ProfileContext.Provider  value={
            {
                incrementer
            }
        }>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider