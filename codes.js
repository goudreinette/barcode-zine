export default function applyCode(webRef, codeData) {
    if (codeData.includes("play")) {
        webRef.injectJavaScript(`
            osc.amp(0.5)
        `)

        return
    }

    if (codeData.includes("stop")) {
        webRef.injectJavaScript(`
            osc.amp(0)
        `)

        return
    } 

    /**
     * Oscillator types
     */
    const [command, param] = codeData.split('-')
    if (command == "osc") {
        webRef.injectJavaScript(`
            osc.setType('${param}')
        `)
    }

    if (command == "f") {
        webRef.injectJavaScript(`
            osc.freq(${param}, 0.1);
        `)
    }
}