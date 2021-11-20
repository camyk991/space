import {useState, useEffect} from 'react'
import "./countdown.css"
function Countdown() {
    
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }, [counter]);

    return(

        <div className="countdown">
            <p>{counter}</p>
        </div>
    )

}

export default Countdown;