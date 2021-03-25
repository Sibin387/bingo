import { useEffect } from 'react'
import { initFireWorks } from '../helpers';

const Celebration = ()=>{
    useEffect(()=>{
        const container = document.querySelector('.fireworks-container')
        const fireworks = initFireWorks(container);
        fireworks.start()
    })
    return <div className="fireworks-container"></div>
}

export default Celebration;