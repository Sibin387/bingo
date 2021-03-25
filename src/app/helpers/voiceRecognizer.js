
export const voiceRecognizer = (texts, cb)=>{
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

    const grammar = '#JSGF V1.0; grammar texts; public <texts> = ' + texts.join(' | ') + ' ;'
    if(!SpeechRecognition){
        return false;
    }
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event)=> {
        const recognised = event.results[0][0].transcript;
        console.log(recognised, "recognised");
        const recognisedTokens = recognised.split(" ").map(r=>r.toLowerCase());
        const results = {};
        texts.forEach((text, id)=>{
            const intersection = text.split(" ").filter(value => recognisedTokens.find(r=>value.toLowerCase().indexOf(r)>=0));
            if(intersection.length>0){
                results[id]=intersection.length;
            }
        })

        if( Object.keys(results).length>0){
            const sorted = Object.keys(results).sort((a,b)=>results[b]-results[a]);
            cb(sorted[0]);
            return;
        }
    }

    // recognition.onnomatch = function(event) {
    // }

    // recognition.onerror = function(event) {
    // }
    return recognition;
}