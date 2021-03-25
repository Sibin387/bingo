import { useEffect, useState } from 'react';
import { voiceRecognizer } from '../helpers';

let recognition;
const VoiceRecognizer = ({ data, toggle })=>{
    const [recording, setRecording] = useState(false);
    const [enabled, setEnabled] = useState(true);
    useEffect(()=>{
        recognition = voiceRecognizer(data, toggle);
        if(!recognition){
            setEnabled(false);
            return;
        }
        recognition.onspeechend = ()=> {
            setRecording(false);
            recognition.stop();
        }
    });

    const start = ()=>{
        setRecording(true);
        recognition.start()
    };

    const stop = ()=>{
        setRecording(false);
        recognition.stop()
    };
    if(!enabled){
        return <button disabled>Please try recording in Google Chrome</button>  
    }
    if(recording){
        return <button onClick={stop}>Stop Voice</button> 
    }

    return <button onClick={start}>Record Voice</button> 
}

export default VoiceRecognizer;