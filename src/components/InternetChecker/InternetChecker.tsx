import { FC, useEffect, useState } from 'react'
import {Alert} from 'react-bootstrap'


const InternetChecker: FC = () => {

    const [status, setStatus] = useState<boolean>()


    useEffect(() => {
        setStatus(navigator.onLine)
    }, [navigator.onLine])


    return (
        <div style={{display:"flex",justifyContent:"center"}}>
  {status?
      <Alert style={{width:"300px"}}  variant="success">
     You are online
    </Alert>:
     <Alert  variant="warning">
     You are offline
    </Alert>
  }
        </div>
    )
}

export default InternetChecker
