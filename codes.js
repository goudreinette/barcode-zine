export default function applyCode(webRef, codeData) {
    
    if (codeData.includes("play")) {
        webRef.injectJavaScript(`
            // osc.amp(0.5)
        `)

        return
    }

    if (codeData.includes("stop")) {
        webRef.injectJavaScript(`
            // osc.amp(0)
        `)

        return
    } 

    /**
     * Split barcode
     */
    const [command, param] = codeData.split('-')

    // Change oscillator type
    if (command == "osc") {
        webRef.injectJavaScript(`
            // osc.setType('${param}')
        `)
    }

    // Switch to frequency
    if (command == "f") {
        webRef.injectJavaScript(`
            // osc.freq(${param}, 0.1);
        `)
    }

    // Play a note
    if (command == "n") {
        webRef.injectJavaScript(`
            synth.triggerAttackRelease('${param}', '4n')
        `)
    }

    webRef.injectJavaScript(`
        
    `)
}