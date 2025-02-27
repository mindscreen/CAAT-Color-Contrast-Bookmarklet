(function () {
    if (document.getElementById('bookmarkletPopup')) return;
    const translationDictionary = {
        en: {
            title: 'Contrast Checker',
            foreground: 'Foreground',
            background: 'Background',
            inputLabel: 'Chose color',
            color: 'Color',
            close: 'Close',
            colorPickerInputLabel: 'Color Picker',
            colorInputLabel: 'Color Value Input',
            apiWarning: 'Unfortunately, the colour picker is currently unavailable in this browser. Please switch to another browser to use this feature.',
            contrastRatio: 'Contrast Ratio:',
            regularText: 'Regular text',
            regularTextLabel: 'Visualization for',
            largeText: 'Large or bold text',
            largeTextExample: 'Large or ',
            largeTextLabel: 'Visualization for ',
            largeTextExampleBold: 'bold text',
            largeTextDescription: 'Min. 18pt/24px or bold and min. 14pt/18.5px',
            nonText: 'Non-text elements',
            nonTextLabel: 'Visualization for non-text-based content',
            applyButton: 'Apply',
            colorAriaLive: 'Selected colour is',
            successIconLabel: 'passed',
            failedIconLabel: 'failed',
            infoIconLabel: 'Info',
            errorIconLabel: 'Error',
            ratioWordTranslator: 'to',
            requiredRatio: 'minimum contrast of {requiredContrast} to 1 required',
            ariaLabels: {
                closeButton: 'Close contrast checker',
                pipetteIcon: 'Eyedropper Tool',
                applyButton: 'Apply Value',
                linkLabel: 'To CAAT website',
                regularTextAA: 'Copy regular text AA to clipboard',
                regularTextAAA: 'Copy regular text AAA to clipboard',
                largeTextAA: 'Copy large or bold text AA to clipboard',
                largeTextAAA: 'Copy large or bold text AAA to clipboard',
                nonTextAA: 'Copy non-text elements AA to clipboard',
            },
            errorMessage: 'Please enter a valid color value.',
            copyMessage: {
                regularText: 'regular text',
                largeText: 'large text',
                nonText: 'non-text elements',
                template: 'was copied to clipboard',
                regularTextAA: 'Regular text AA',
                regularTextAAA: 'Regular text AAA',
                largeTextAA: 'Large or bold text AA',
                largeTextAAA: 'Large or bold text AAA',
                nonTextAA: 'Non-text elements AA',
                clipboardTextPassed: 'For {contentType}, the selected foreground colour ({foregroundColor}) and background colour ({backgroundColor}) result in a contrast of {contrastValue} for {label}, which corresponds to the required minimum contrast ratio of {requiredContrast}:1.',
                clipboardTextFailed: 'For {contentType}, the selected foreground colour ({foregroundColor}) and background colour ({backgroundColor}) result in a contrast of {contrastValue} for {label} instead of the required minimum contrast ratio of {requiredContrast}:1.'
            }
        },
        de: {
            title: 'Kontrast-Prüfer',
            foreground: 'Vordergrund',
            background: 'Hintergrund',
            inputLabel: 'Farbe wählen',
            color: 'Farbe',
            close: 'Schließen',
            colorPickerInputLabel: 'Farbauswahl Pipette',
            colorInputLabel: 'Farbwert-Eingabe',
            apiWarning: 'Die Pipette kann in diesem Browser nicht verwendet werden. Bitte wechseln Sie zu einem anderen Browser, um die Funktion nutzen zu können.',
            contrastRatio: 'Kontrastverhältnis:',
            regularText: 'Regulärer Text',
            regularTextLabel: 'Visualisierung for ',
            largeText: 'Großer oder fetter Text',
            largeTextExample: 'Großer oder ',
            largeTextLabel: 'Visualisierung für',
            largeTextExampleBold: 'fetter Text',
            largeTextDescription: 'Min. 18pt/24px oder fett und min. 14pt/18.5px',
            nonText: 'Nicht-Textbasierte-Inhalte',
            nonTextLabel: 'Visualisierung für nicht-textbasierte Inhalte',
            applyButton: 'Übernehmen',
            colorAriaLive: 'Die ausgewählte farbe ist',
            successIconLabel: 'bestanden',
            failedIconLabel: 'fehlgeschlagen',
            infoIconLabel: 'Hinweis',
            errorIconLabel: 'Fehler',
            ratioWordTranslator: 'zu',
            requiredRatio: 'Mindestkontrast von {requiredContrast} zu 1 erforderlich',
            ariaLabels: {
                closeButton: 'Kontrast-Prüfer schließen',
                pipetteIcon: 'Pipettenwerkzeug',
                applyButton: 'Wert übernehmen',
                linkLabel: 'Zur CAAT Website',
                regularTextAA: 'Regulärer Text AA in die Zwischenablage kopieren',
                regularTextAAA: 'Regulärer Text AAA in die Zwischenablage kopieren',
                largeTextAA: 'Großer oder fetter Text AA in die Zwischenablage kopieren',
                largeTextAAA: 'Großer oder fetter AAA in die Zwischenablage kopieren',
                nonTextAA: 'Nicht-textbasierte-Inhalte AA in die Zwischenablage kopieren',
            },
            errorMessage: 'Bitte geben Sie einen validen Farbwert ein.',
            copyMessage: {
                regularText: 'regulären Text',
                largeText: 'großen und fetten Text',
                nonText: 'nicht-textbasierte-Inhalte',
                template: 'in Zwischenablage kopiert',
                regularTextAA: 'Regulärer Text AA',
                regularTextAAA: 'Regulärer Text AAA',
                largeTextAA: 'Großer oder fetter Text AA',
                largeTextAAA: 'Großer oder fetter Text AAA',
                nonTextAA: 'Nicht-Textbasierte-Inhalte AA',
                clipboardTextPassed: 'Für {contentType} ergibt sich mit der gewählten Vordergrundfarbe ({foregroundColor}) und Hintergrundfarbe ({backgroundColor}) ein Kontrast von {contrastValue} für {label}, was dem geforderten Mindestkontrastverhältnis von {requiredContrast}:1 entspricht.',
                clipboardTextFailed: 'Für {contentType} ergibt sich mit der gewählten Vordergrundfarbe ({foregroundColor}) und Hintergrundfarbe ({backgroundColor}) ein Kontrast von {contrastValue} für {label}, anstelle des geforderten Mindestkontrastverhältnis von {requiredContrast}:1.'
            }
        }
    };

    // default color values
    const defaultForegroundColor = '#323130';
    const defaultBackgroundColor = '#cdece8';

    const userLanguage = navigator.languages
        .flatMap(l => [l, l.slice(0, 2)])
        .find(l => l in translationDictionary) ?? Object.keys(translationDictionary)[0];
    const translations = translationDictionary[userLanguage]

    const clipboardSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="currentColor" aria-hidden="true" class="clipboardIcon">\n<path fill="currentColor" fill-rule="evenodd" d="M12.675 6.226V7.5a.32.32 0 0 1-.319.32h-3.82a.32.32 0 0 1-.321-.32V6.226a.32.32 0 0 1 .32-.32h.484a.16.16 0 0 0 .16-.142 1.274 1.274 0 0 1 2.53 0 .16.16 0 0 0 .16.142h.486a.32.32 0 0 1 .32.32m-1.91 12.026a.797.797 0 0 0-.797-.797H7.26a.687.687 0 0 1-.64-.728V8.542a.695.695 0 0 1 .54-.714.16.16 0 0 0 .127-.165 34 34 0 0 1-.035-1.281.16.16 0 0 0-.16-.158H5.991a.957.957 0 0 0-.96.957v10.91a.956.956 0 0 0 .956.957h3.98c.44 0 .797-.357.797-.796m2.847-10.59a.16.16 0 0 0 .128.17c.322.08.543.378.527.71v.896a.797.797 0 0 0 1.594 0V7.181a.957.957 0 0 0-.96-.957h-1.104a.16.16 0 0 0-.16.16c0 .304 0 .956-.025 1.279m3.599 8.032h-2.548a.48.48 0 0 0 0 .961h2.548a.48.48 0 0 0 0-.96m-2.548-1.268a.48.48 0 1 1 0-.96h1.592a.48.48 0 0 1 0 .96zm5.417-1.17c0-.34-.135-.664-.374-.903l-.9-.897a1.28 1.28 0 0 0-.904-.374h-4.87c-.704 0-1.276.57-1.277 1.273v6.37c0 .706.573 1.28 1.28 1.28H18.8a1.28 1.28 0 0 0 1.28-1.28zm-6.404-.897a.64.64 0 0 0-.64.64l.003 5.085c0 .353.286.64.64.64h4.483a.64.64 0 0 0 .64-.64v-4.562a.64.64 0 0 0-.188-.454l-.523-.522a.64.64 0 0 0-.453-.187z" clip-rule="evenodd"/>\n<mask id="a" width="16" height="17" x="5" y="4" maskUnits="userSpaceOnUse" style="mask-type:luminance">\n<path fill="#fff" fill-rule="evenodd" d="M12.675 6.226V7.5a.32.32 0 0 1-.319.32h-3.82a.32.32 0 0 1-.321-.32V6.226a.32.32 0 0 1 .32-.32h.484a.16.16 0 0 0 .16-.142 1.274 1.274 0 0 1 2.53 0 .16.16 0 0 0 .16.142h.486a.32.32 0 0 1 .32.32m-1.91 12.026a.797.797 0 0 0-.797-.797H7.26a.687.687 0 0 1-.64-.728V8.542a.695.695 0 0 1 .54-.714.16.16 0 0 0 .127-.165 34 34 0 0 1-.035-1.281.16.16 0 0 0-.16-.158H5.991a.957.957 0 0 0-.96.957v10.91a.956.956 0 0 0 .956.957h3.98c.44 0 .797-.357.797-.796m2.847-10.59a.16.16 0 0 0 .128.17c.322.08.543.378.527.71v.896a.797.797 0 0 0 1.594 0V7.181a.957.957 0 0 0-.96-.957h-1.104a.16.16 0 0 0-.16.16c0 .304 0 .956-.025 1.279m3.599 8.032h-2.548a.48.48 0 0 0 0 .961h2.548a.48.48 0 0 0 0-.96m-2.548-1.268a.48.48 0 1 1 0-.96h1.592a.48.48 0 0 1 0 .96zm5.417-1.17c0-.34-.135-.664-.374-.903l-.9-.897a1.28 1.28 0 0 0-.904-.374h-4.87c-.704 0-1.276.57-1.277 1.273v6.37c0 .706.573 1.28 1.28 1.28H18.8a1.28 1.28 0 0 0 1.28-1.28zm-6.404-.897a.64.64 0 0 0-.64.64l.003 5.085c0 .353.286.64.64.64h4.483a.64.64 0 0 0 .64-.64v-4.562a.64.64 0 0 0-.188-.454l-.523-.522a.64.64 0 0 0-.453-.187z" clip-rule="evenodd"/>\n</mask>\n<g mask="url(#a)">\n</g>\n</svg>'
    const contrastSufficientSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M.699 13c0-7.18 5.82-13 13-13 7.176.008 12.992 5.824 13 13 0 7.18-5.82 13-13 13s-13-5.82-13-13m19.014-6.262A1.354 1.354 0 0 1 21.01 8.88l-7.258 9.844a1.37 1.37 0 0 1-1.936.255l-5.182-4.145a1.355 1.355 0 0 1 1.693-2.116l4.081 3.265 6.418-8.71c.213-.289.532-.481.887-.535" clip-rule="evenodd"/></svg>`
    const contrastInsufficientSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M14 0C6.82 0 1 5.82 1 13s5.82 13 13 13 13-5.82 13-13C26.992 5.824 21.177.008 14 0m0 23.833c-5.983 0-10.833-4.85-10.833-10.833S8.016 2.167 14 2.167 24.833 7.017 24.833 13C24.827 18.98 19.98 23.827 14 23.833m5.18-17.37a1.353 1.353 0 0 1 .958 2.312l-4.03 4.032a.27.27 0 0 0 0 .384l4.032 4.032c.529.529.529 1.386 0 1.915a1.38 1.38 0 0 1-1.915 0l-4.034-4.03a.27.27 0 0 0-.383 0L9.776 19.14a1.375 1.375 0 0 1-1.915 0 1.355 1.355 0 0 1 0-1.915l4.032-4.034a.27.27 0 0 0 0-.384L7.861 8.775a1.354 1.354 0 1 1 1.914-1.914l4.033 4.032a.27.27 0 0 0 .383 0l4.032-4.032c.254-.254.598-.397.958-.397" clip-rule="evenodd"/></svg>`
    const pipetteIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true" class="pipetteIcon"><path fill="#fff" d="m6.912 16.882 6.974-7.541 2.386 2.206-6.974 7.541z"/><mask id="a" width="20" height="20" x="3.328" y="3.332" fill="#000" maskUnits="userSpaceOnUse"><path fill="#fff" d="M3.328 3.332h20v20h-20z"/><path fill-rule="evenodd" d="M15.936 5.464a3.45 3.45 0 0 1 4.855-.255 3.45 3.45 0 0 1-.255 4.855L19.1 11.5a.18.18 0 0 0 0 .255l.384.384a.723.723 0 1 1-1.022 1.021l-.384-.383a.18.18 0 0 0-.255 0l-6.535 6.535a3.64 3.64 0 0 1-2.827 1.293l-.75.751c-.424.421-1.108.421-1.532 0l-1.534-1.533a1.084 1.084 0 0 1 0-1.533l.75-.75a3.64 3.64 0 0 1 1.294-2.827l6.535-6.535a.18.18 0 0 0 0-.256l-.383-.383a.723.723 0 0 1 1.022-1.022l.383.384c.034.033.08.052.128.052.047 0 .093-.019.127-.053zm-7.495 13.67c.47.15 1.138-.157 1.825-.845l6.534-6.534a.18.18 0 0 0 0-.255l-2.3-2.3a.18.18 0 0 0-.254 0l-1.498 1.498a.18.18 0 0 0 0 .255l.969.97a.542.542 0 0 1-.766.765l-.97-.968a.18.18 0 0 0-.255 0l-.423.423a.18.18 0 0 0 0 .256l.968.969a.542.542 0 0 1-.766.766l-.969-.969a.18.18 0 0 0-.255 0l-.423.423a.18.18 0 0 0 0 .256l.968.97a.542.542 0 0 1-.766.765l-.97-.968a.18.18 0 0 0-.254 0L7.71 15.735c-.686.685-.994 1.351-.844 1.826a.72.72 0 0 1-.178.728l-.64.64a.18.18 0 0 0 0 .256l.768.766a.18.18 0 0 0 .255 0l.64-.64a.72.72 0 0 1 .729-.178" clip-rule="evenodd"/></mask><path fill="#323130" fill-rule="evenodd" d="M15.936 5.464a3.45 3.45 0 0 1 4.855-.255 3.45 3.45 0 0 1-.255 4.855L19.1 11.5a.18.18 0 0 0 0 .255l.384.384a.723.723 0 1 1-1.022 1.021l-.384-.383a.18.18 0 0 0-.255 0l-6.535 6.535a3.64 3.64 0 0 1-2.827 1.293l-.75.751c-.424.421-1.108.421-1.532 0l-1.534-1.533a1.084 1.084 0 0 1 0-1.533l.75-.75a3.64 3.64 0 0 1 1.294-2.827l6.535-6.535a.18.18 0 0 0 0-.256l-.383-.383a.723.723 0 0 1 1.022-1.022l.383.384c.034.033.08.052.128.052.047 0 .093-.019.127-.053zm-7.495 13.67c.47.15 1.138-.157 1.825-.845l6.534-6.534a.18.18 0 0 0 0-.255l-2.3-2.3a.18.18 0 0 0-.254 0l-1.498 1.498a.18.18 0 0 0 0 .255l.969.97a.542.542 0 0 1-.766.765l-.97-.968a.18.18 0 0 0-.255 0l-.423.423a.18.18 0 0 0 0 .256l.968.969a.542.542 0 0 1-.766.766l-.969-.969a.18.18 0 0 0-.255 0l-.423.423a.18.18 0 0 0 0 .256l.968.97a.542.542 0 0 1-.766.765l-.97-.968a.18.18 0 0 0-.254 0L7.71 15.735c-.686.685-.994 1.351-.844 1.826a.72.72 0 0 1-.178.728l-.64.64a.18.18 0 0 0 0 .256l.768.766a.18.18 0 0 0 .255 0l.64-.64a.72.72 0 0 1 .729-.178" clip-rule="evenodd"/><path fill="#fff" d="m20.791 5.209.746-.666-.038-.042-.042-.038zm-4.855.255.707.707.017-.017.017-.018zm4.6 4.6-.672-.74-.018.015-.017.018zM19.1 11.5l-.707-.707h-.001zm0 .255-.708.706zm.384.384-.707.707.006.006.006.006zm.197.702.967.254zm-.516.517-.254-.968zm-.703-.198.72-.694-.007-.007-.006-.006zm-.384-.383.707-.707v-.002zm-.255 0-.706-.708h-.001zm-6.535 6.535-.707-.707-.03.03-.028.032zM8.46 20.605l.012-1-.421-.005-.298.299zm-.75.751.705.71.003-.003zm-1.532 0-.708.707.003.003zm-1.534-1.533-.707.707zm0-1.533.707.707zm.75-.75.708.706.297-.298-.005-.42zm1.294-2.827.645.765.032-.028.03-.03zm6.535-6.535.707.707.001-.001zm0-.256.708-.706zm-.383-.383-.72.694.006.006.006.006zm.009-1.013-.707-.707zm1.013-.01.707-.706-.006-.006-.007-.006zm.383.385-.708.706.005.005zm.128.052-.004 1h.005zM14.5 6.9l-.707-.707-.007.006zm-4.235 11.39-.707-.708zm-1.825.843.304-.952-.003-.001zm8.36-7.378-.706-.709-.002.002zm0-.255-.708.707.002.002zm-2.3-2.3.707-.707-.001-.001zm-.255 0-.706-.708-.001.001zm-1.498 1.498.707.707zm0 .255.708-.707h-.001zm.969.97.731-.682-.011-.013-.013-.012zm-.766.765-.707.708.012.012.013.012zm-.97-.968-.708.705.002.002zm-.255 0 .707.708.002-.003zm-.423.423.706.708zm0 .256.707-.707v-.001zm.968.969.732-.682-.012-.013-.012-.012zm-.013.753-.707-.707zm-.753.013-.707.707.013.013.013.012zm-.969-.969-.709.706.002.002zm-.255 0 .707.708.002-.002zm-.423.423.706.708zm0 .256.707-.707h-.001zm.968.97.732-.683-.012-.012-.013-.013zm-.013.752-.707-.707zm-.753.013-.707.708.013.012.012.012zm-.97-.968-.708.705.002.002zm-.254 0 .707.707.002-.002zM7.71 15.735l.707.707zm-.844 1.826.954-.3zm-.178.728-.707-.707zm-.64.64.707.708.001-.002zm0 .256.707-.708zm.768.766.71-.706-.003-.002zm.255 0-.707-.707-.001.001zm.64-.64.706.708h.001zM21.456 4.464a4.45 4.45 0 0 0-6.262.329l1.482 1.344a2.45 2.45 0 0 1 3.448-.181zm-.25 6.341a4.45 4.45 0 0 0 .33-6.261l-1.492 1.332a2.45 2.45 0 0 1-.181 3.448zm-1.4 1.403 1.436-1.436-1.414-1.414-1.436 1.436zm.001-1.158a.82.82 0 0 1 0 1.157l-1.416-1.412a1.18 1.18 0 0 0 0 1.667zm.383.382-.384-.383-1.414 1.414.384.384zm.457 1.664a1.72 1.72 0 0 0-.47-1.676l-1.389 1.439a.28.28 0 0 1-.076-.27zm-1.23 1.23a1.72 1.72 0 0 0 1.23-1.23l-1.935-.507a.28.28 0 0 1 .198-.198zm-1.675-.47a1.72 1.72 0 0 0 1.675.47l-.507-1.935c.097-.025.2.004.27.076zm-.372-.371.384.383 1.414-1.414-.384-.383zm1.158 0a.82.82 0 0 1-1.157 0l1.412-1.415a1.18 1.18 0 0 0-1.667 0zm-6.534 6.535 6.535-6.535-1.414-1.414-6.535 6.535zM8.45 21.605a4.64 4.64 0 0 0 3.602-1.649l-1.529-1.289a2.64 2.64 0 0 1-2.05.938zm-.031.458.75-.75-1.415-1.414-.75.75zm-2.945.003a2.09 2.09 0 0 0 2.942 0l-1.409-1.42a.09.09 0 0 1-.124 0zM3.938 20.53l1.533 1.533 1.415-1.414-1.534-1.533zm0-2.947a2.084 2.084 0 0 0 0 2.947l1.414-1.414a.084.084 0 0 1 0-.12zm.75-.75-.75.75 1.414 1.414.75-.751zm1.357-2.885a4.64 4.64 0 0 0-1.65 3.603l2-.024c-.01-.789.335-1.541.939-2.05zm6.472-6.477-6.535 6.535 1.415 1.414 6.534-6.535zm-.001 1.157a.82.82 0 0 1 0-1.156l1.416 1.412a1.18 1.18 0 0 0 0-1.668zm-.383-.383.383.384 1.416-1.413-.383-.384zm.01-2.426a1.723 1.723 0 0 0-.021 2.414l1.438-1.389a.277.277 0 0 1-.003.389zm2.414-.021a1.723 1.723 0 0 0-2.414.02l1.414 1.415a.277.277 0 0 1-.389.003zm.396.396-.383-.384-1.415 1.413.383.384zm-.576-.24c.214 0 .42.085.571.235l-1.405 1.423c.22.218.518.34.828.341zm-.59.245a.82.82 0 0 1 .585-.246l.003 2c.316 0 .618-.127.84-.353zm1.442-1.442-1.435 1.436 1.414 1.414 1.435-1.436zm-5.67 12.826c-.289.288-.532.455-.706.535-.182.084-.197.034-.108.063l-.609 1.905c.56.179 1.114.051 1.555-.152.45-.208.884-.539 1.283-.938zm6.534-6.535L9.56 17.582l1.414 1.414 6.534-6.534zm-.24.58a.82.82 0 0 1 .242-.582l1.41 1.418a1.18 1.18 0 0 0 .348-.837zm.242.58a.82.82 0 0 1-.242-.58h2a1.18 1.18 0 0 0-.347-.837zm-2.301-2.3 2.3 2.299 1.413-1.414-2.3-2.3zm1.158 0a.82.82 0 0 1-1.157 0l1.412-1.416a1.18 1.18 0 0 0-1.667 0zm-1.496 1.497 1.497-1.498-1.414-1.414L12.04 9.99zm.24-.58a.82.82 0 0 1-.241.58L12.042 9.99a1.18 1.18 0 0 0-.347.835zm-.241-.58a.82.82 0 0 1 .24.58h-2c0 .314.125.615.347.836zm.97.97-.97-.969-1.414 1.414.968.97zm-.014 2.167a1.54 1.54 0 0 0 .037-2.141l-1.463 1.363a.46.46 0 0 1 .011-.636zm-2.142.038c.608.566 1.554.55 2.142-.038l-1.415-1.414a.46.46 0 0 1 .636-.011zm-.994-.992.969.968 1.414-1.415-.97-.968zm.58.24a.82.82 0 0 1-.582-.242l1.417-1.411a1.18 1.18 0 0 0-.836-.348zm.58-.242a.82.82 0 0 1-.58.241v-2a1.18 1.18 0 0 0-.837.348zm-.426.425.424-.423-1.413-1.416-.423.423zm.24-.58a.82.82 0 0 1-.24.58l-1.412-1.416a1.18 1.18 0 0 0-.347.836zm-.24-.58a.82.82 0 0 1 .24.58h-2c0 .313.126.614.348.836zm.97.97-.969-.97-1.414 1.415.968.969zm-.014 2.167a1.54 1.54 0 0 0 .038-2.142L11.54 14.05a.46.46 0 0 1 .011-.636zm-2.141.038c.607.566 1.554.549 2.141-.038l-1.414-1.414a.46.46 0 0 1 .636-.012zm-.995-.993.97.968 1.413-1.414-.969-.969zm.58.24a.82.82 0 0 1-.582-.242l1.418-1.41a1.18 1.18 0 0 0-.836-.348zm.581-.242a.82.82 0 0 1-.581.242v-2a1.18 1.18 0 0 0-.837.347zm-.426.425.424-.423-1.413-1.415-.424.422zm.24-.58a.82.82 0 0 1-.24.58L9.15 12.88a1.18 1.18 0 0 0-.346.836zm-.24-.58a.82.82 0 0 1 .24.58h-2c0 .314.125.615.347.836zm.97.97-.969-.969-1.415 1.414.969.969zm-.014 2.167a1.54 1.54 0 0 0 .038-2.142l-1.464 1.364a.46.46 0 0 1 .012-.636zm-2.142.038c.608.566 1.555.55 2.142-.038l-1.414-1.414a.46.46 0 0 1 .636-.011zm-.994-.993.97.969 1.413-1.415-.97-.969zm.58.24a.82.82 0 0 1-.582-.242l1.418-1.41a1.18 1.18 0 0 0-.837-.348zm.58-.242a.82.82 0 0 1-.58.242v-2a1.18 1.18 0 0 0-.837.347zm-1.126 1.126 1.125-1.124-1.414-1.415-1.125 1.124zm-.597.818c.026.084-.021.067.062-.114.08-.173.247-.416.535-.704l-1.413-1.415c-.399.398-.73.83-.937 1.28-.205.443-.331.996-.154 1.556zm-.425 1.736a1.72 1.72 0 0 0 .425-1.734l-1.908.6a.28.28 0 0 1 .069-.28zm-.639.64.64-.64-1.416-1.413-.639.64zm.24-.58a.82.82 0 0 1-.24.58l-1.413-1.415a1.18 1.18 0 0 0-.347.836zm-.24-.58a.82.82 0 0 1 .24.58h-2c0 .314.125.615.347.837zm.767.767-.768-.766-1.413 1.415.768.766zm-.58-.24a.82.82 0 0 1 .582.242L6.11 20.656c.221.223.522.348.836.348zm-.58.242a.82.82 0 0 1 .58-.241v2c.315 0 .616-.125.837-.348zm.64-.64-.639.639 1.415 1.414.638-.64zm1.738-.425a1.72 1.72 0 0 0-1.738.425l1.415 1.413a.28.28 0 0 1-.28.069z" mask="url(#a)"/></svg>`
    const errorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label="${translations.errorIconLabel}"><path fill="#D00" d="M7 0a7 7 0 1 0 7 7 7.01 7.01 0 0 0-7-7"/><path fill="#fff" d="M10.068 3.946a.674.674 0 0 0-.955 0l-2.01 2.012a.135.135 0 0 1-.192 0l-2.01-2.012a.675.675 0 1 0-.956.955l2.011 2.012a.135.135 0 0 1 0 .191l-2.01 2.013a.677.677 0 0 0 0 .956c.265.258.689.258.955 0L6.91 8.06a.134.134 0 0 1 .191 0l2.012 2.01a.687.687 0 0 0 .955 0 .677.677 0 0 0 0-.955L8.06 7.104a.135.135 0 0 1 0-.191L10.067 4.9a.675.675 0 0 0 0-.955"/></svg>`


    let container = document.createElement('div');
    container.id = 'bookmarkletPopup';
    container.setAttribute('lang', userLanguage);
    document.body.appendChild(container);

    let shadowRoot = container.attachShadow({mode: 'open'});

    let popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.width = 'min-content';

    popup.innerHTML = `
        <div class="toolbar" id="toolbar">
            <button aria-label="${translations.ariaLabels.closeButton}" id="closePopup" class="closeButton">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path fill="#fff" d="M12.666 1.333a1.25 1.25 0 0 0-1.768 0L7.176 5.055a.25.25 0 0 1-.353 0L3.1 1.333A1.25 1.25 0 1 0 1.333 3.1l3.722 3.722a.25.25 0 0 1 0 .354L1.333 10.9a1.25 1.25 0 0 0 0 1.768 1.27 1.27 0 0 0 1.768 0l3.722-3.722a.25.25 0 0 1 .353 0l3.724 3.72a1.27 1.27 0 0 0 1.768 0 1.25 1.25 0 0 0 0-1.768L8.946 7.176a.25.25 0 0 1 0-.354l3.72-3.722a1.25 1.25 0 0 0 0-1.767"/></svg>
            </button>
        </div>
        <div class="popupContent">
            <h2 id="popupTitle">${translations.title}</h2>
            <p class="caatLink">Powered by <a href="https://www.caat.report/" target="_blank" rel="noopener nofollow">CAAT.report</a></p>
            <div id="apiWarning">
                <div class="warningIconWrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" aria-label="${translations.infoIconLabel}"><path fill="currentColor" fill-rule="evenodd" d="M7 0a7 7 0 1 0 7 7 7.01 7.01 0 0 0-7-7m.33 11.35q-.464.053-.872-.226-.408-.291-.49-1.019a2.7 2.7 0 0 1 .018-.787q.077-.383.18-.746.116-.363.186-.697.081-.348.044-.67-.032-.286-.141-.394-.11-.12-.242-.105-.202.023-.363.307l-.09-.038a1.6 1.6 0 0 1 .206-.845q.223-.375.57-.609.36-.234.73-.276a1.15 1.15 0 0 1 .82.208q.367.248.442.903.045.394-.023.849-.06.441-.164.888-.095.445-.171.829-.065.381-.035.644.026.226.12.312.105.085.214.072a.4.4 0 0 0 .195-.082.5.5 0 0 0 .138-.173l.086.014q.051.441-.15.802a1.7 1.7 0 0 1-.513.579 1.55 1.55 0 0 1-.695.26m.242-9.163q.48.073.75.408.255.345.187.79-.072.482-.486.775a1.23 1.23 0 0 1-.93.216q-.48-.072-.735-.418a1 1 0 0 1-.2-.792q.072-.48.486-.775.41-.282.928-.204" clip-rule="evenodd"/></svg>
                </div>
                <div class="apiWarningTextWrapper">
                    <span class="divider"></span>
                    <span id="apiWarningText">${translations.apiWarning}</span>
                </div>
            </div>
            <section class="colorPickersWrapper" id="colorPickersWrapper">
                <div class="colorPickers" id="colorPickers"></div>
                <div id="errorMessageWrapper" aria-live="assertive" aria-atomic="true"></div>
            </section>
        </div>
        <section class="contrastRatioWrapper">
            <div class="textSizeExamples" id="textSizeExamples">
                <div class="exampleText">
                    <p id="largeTextExample">
                        <span class="visuallyhidden">${translations.largeTextLabel}</span>
                        <span>${translations.largeTextExample}</span>
                        <span>${translations.largeTextExampleBold}</span>
                    </p>
                    <p id="regularTextExample">
                        <span class="visuallyhidden">${translations.regularTextLabel}</span>
                        <span>${translations.regularText}</span>
                    </p>
                </div>
                <div class="caatIcon">
                    <svg aria-labelledby="nonTextVisualizationTitle" role="img" width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title id="nonTextVisualizationTitle">${translations.nonTextLabel}</title>
                        <g clip-path="url(#clip0_151_482)">
                            <path id="caatHeadShape" d="M19.8214 13.4983C17.2847 13.4983 12.3669 28.023 6.20775 46.0493C4.02964 52.4247 2.01228 59.2834 -0.000488281 66.0001H65.9995V42.4452C60.3477 25.9758 55.4686 13.4983 52.9893 13.4983C48.4236 13.4983 46.2342 25.2169 45.202 27.0519C40.6594 26.1762 32.9814 25.9077 27.3419 27.0519C25.9646 25.3699 22.374 13.4983 19.8214 13.4983Z"/>
                            <path class="caatFacialFeatures caatNoseFill" d="M36.4178 52.599C37.3972 52.599 38.1911 51.8051 38.1911 50.8258C38.1911 49.8464 37.3972 49.0525 36.4178 49.0525C35.4385 49.0525 34.6445 49.8464 34.6445 50.8258C34.6445 51.8051 35.4385 52.599 36.4178 52.599Z" fill="#CDECE8"/>
                            <path class="caatFacialFeatures" d="M49.6487 40.6665C49.6487 43.0152 47.7977 44.919 45.5143 44.919C43.2309 44.919 41.3799 43.0152 41.3799 40.6665"/>
                            <path class="caatFacialFeatures" d="M30.7479 40.6665C30.7479 43.0152 28.8968 44.919 26.6134 44.919C24.3301 44.919 22.479 43.0152 22.479 40.6665"/>
                            <path class="caatFacialFeatures" d="M36.4193 52.4792C36.4193 54.1754 34.9914 55.5505 33.23 55.5505C31.4685 55.5505 30.0405 54.1754 30.0405 52.4792"/>
                            <path class="caatFacialFeatures" d="M43.0345 52.4792C43.0345 54.1754 41.5536 55.5505 39.727 55.5505C37.9002 55.5505 36.4194 54.1754 36.4194 52.4792"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_151_482">
                                <rect width="66" height="66" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div class="contrastRatio">
                <p>
                    <span class="visuallyhidden" id="contrastRatioLabel" aria-live="assertive" aria-atomic="true">"${translations.contrastRatio}"</span>
                    <span aria-hidden="true" class="contrastRatioText">
                        <strong id="contrastRatio"></strong>
                        <span class="colon">:</span>
                        <span>1</span>
                    </span>
                </p>
            </div>
        </section>
        <section class="contrastResultsWrapper" id="contrastResultWrapper"></section>
    `;

    shadowRoot.appendChild(popup);

    const colorDarkGrey = '#323130';
    const colorLightGrey = '#ffffff';
    const colorCopyMessage = '#747474';
    const colorBoxShadow = '#00000022';
    const colorCloseButton = '#605e5c';
    const colorApplyButtonBorder = '#8a8886';
    const colorErrorRed = '#ff0000';

    //Styling
    const style = document.createElement('style');
    const css = String.raw;
    style.textContent = css`
        :host {
            color: initial;
            all: initial;
        }

        #popup {
            color: ${colorDarkGrey};
            position: fixed;
            margin: 0;
            font-size: 1rem;
            padding: 0;
            top: 20px;
            right: 20px;
            background-color: ${colorLightGrey};
            box-shadow: 1px 1px 6px 2px ${colorBoxShadow};
            line-height: normal;
            border-radius: 6px;
            z-index: 10000;
            font-family: Arial, Helvetica, sans-serif;
            outline: 2px solid transparent;
        }
        
        svg {
            pointer-events: none;
        }

        #bookmarkletPopup {
            margin:0 0 1000px 0;
        }

        .toolbar {
            height: 29px;
            width: 100%;
            background-color: ${colorDarkGrey};
            border-radius: 6px 6px 0 0;
            align-items: center;
            align-content: center;
            cursor: grab;
        }

        .toolbar:hover {
            cursor: grab;
        }

        .toolbar:active {
            cursor: grabbing;
        }

        .contrastLevelWrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
        }

        ul {
            margin: 8px 0 0 0;
            width: 100%;
            display: flex;
            padding: 0;
            justify-content: space-between;
        }

        li {
            margin: 0;
            list-style: none;
            display: inline-block;
            width: 46%;
            height: 30px;
            box-sizing: border-box;
            min-width: max-content;
        }

        .largeTextDescription {
            font-size: 0.875rem;
            margin: 2px 0 0 0;
        }

        button {
            all: unset;
            cursor: pointer;
        }

        .clipboardWrapper {
            border: 1px solid ${colorDarkGrey};
            border-radius: 2px;
            width: 30px;
            height: 30px;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            position: relative;
            transition: transform 0.3s ease;
        }

        .clipboardWrapper:focus-visible {
            box-shadow: inset 0 0 0 1px ${colorDarkGrey};
            border-color: ${colorDarkGrey};
            transform: scale(1.067);
        }

        .clipboardWrapper:hover {
            transform: scale(1.067);
        }

        .clipboardIcon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .clipboardWrapper:hover {
            cursor: pointer;
        }

        .head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 0 25px 0;
        }

        .levelResult {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 1rem;
            min-width: max-content;
        }

        .levelResult p {
            margin: 0 10px 0 5px;
            font-weight: bold;
        }

        .levelResult p span {
            font-size: 0.875rem;
            font-weight: 500;
        }

        h2 {
            color: ${colorDarkGrey};
            font-size: 1.5rem;
            height: auto;
            line-height: 29.3px;
            margin: 6px 0 1px 0;
        }

        .closeButton {
            position: relative;
            background: none;
            border: none;
            cursor: pointer;
            color: ${colorCloseButton};
            float: right;
            display: flex;
            right: 4px;
            padding: 4px;
        }

        .closeButton:focus {
            box-shadow: inset 0 0 0 2px ${colorLightGrey};
            border-color: ${colorLightGrey};
            border-radius: 2px;
        }
        
        .closeButton:hover {
            animation: closeButtonHoverRight 0.3s ease forwards;
        }

        .closeButton:hover svg {
            animation: closeButtonHover 0.3s ease forwards;
        }


        .popupContent {
            padding: 0 20px 0 20px;
        }

        .textSizeExamples {
            --ccc-background: ${defaultBackgroundColor};
            --ccc-foreground: ${defaultForegroundColor};
            background-color: var(--ccc-background);
            color: var(--ccc-foreground);
            height: 100%;
            min-width: max-content;
            max-width: 75%;
            display: flex;
        }

        .contrastRatio {
            display: flex;
            flex-direction: column;
            font-weight: normal;
            font-size: 1.5rem;
            margin: 0 auto;
            padding-right: 20px;
        }
        
        .contrastRatio p {
            margin: auto 0 3px 0;
            padding: 0;
            width: 80px;
            text-align: center;
            display: flex;
        }

        .contrastRatioText {
            display: flex;
            flex-direction: row;
            margin: auto auto 3px auto;
            line-height: 1em;
        }

        .colon {
            margin: 0 0.1em;
        }

        .caatIcon {
            display: flex;
            flex-direction: column;
            margin: 0 0 0 auto;
        }

        .caatIcon svg {
            margin: auto 0 0 0;
        }

        .caatFacialFeatures {
            stroke: var(--ccc-background);
        }

        .caatNoseFill {
            fill: var(--ccc-background);
        }

        #caatHeadShape {
            fill: currentColor;
        }

        #apiWarning {
            width: 100%;
            display: none;
            margin: 20px 0 5px 0;
        }

        .warningIconWrapper {
            line-height: 0;
            font-size: 1rem;
            min-width: 16px;
            min-height: 16px;
            display: flex;
            flex-shrink: 0;
            margin: 0;
            box-sizing: border-box;
            padding: 1px 0 0 0;
        }

        .apiWarningTextWrapper {
            display: flex;
            align-items: stretch;
            gap: 8px;
        }

        .divider {
            width: 6px;
            background-color: ${colorDarkGrey};
            position: relative;
            right: -3px;
        }

        #apiWarningText {
            font-size: 0.875rem;
            line-height: normal;
            display: inline-block;
        }

        .colorPickersWrapper {
            display: flex;
            flex-direction: column;
            margin: 15px 0 0 0;
        }
        
        .colorPickers {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin: 0;
        }

        .foregroundInputWrapper,
        .backgroundInputWrapper {
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            border: 1px solid ${colorDarkGrey};
            border-radius: 2px;
            height: 35px;
            overflow: hidden;
            margin: 5px 0 0 0;
        }
        
        #foregroundPickerWrapper,
        #backgroundPickerWrapper {
            max-width: 46%;
            border: none;
            margin: 0;
            padding: 0;
        }
        
        #foregroundLabel,
        #backgroundLabel {
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
        }

        #foregroundDiv, #backgroundDiv {
            position: relative;
            box-sizing: border-box;
            width: 30%;
            border-right: 1px solid ${colorDarkGrey};
        }

        #foregroundDiv {
            background-color: ${defaultForegroundColor};
        }

        #backgroundDiv {
            background-color: ${defaultBackgroundColor};
        }


        #foregroundDiv:hover .pipetteIcon {
            animation: growHeight 0.3s ease forwards;
        }
        
        #foregroundColor,
        #backgroundColor {
            width: 100%;
            height: 100%;
            border-radius: 0;
            margin: 0;
            padding: 0;
            border: none;
            display: block;
            opacity: 0;
        }

        #backgroundDiv:focus-within,
        #foregroundDiv:focus-within {
            box-shadow: inset 0 0 0 1px ${colorDarkGrey};
        }

        #backgroundDiv:focus-within .pipetteIcon {
            animation: growHeight 0.3s ease forwards;
        }

        #backgroundColor:hover {
            cursor: pointer;
        }
        
        #foregroundColor:hover {
            cursor: pointer;
        }


        #foregroundDiv:focus-within .pipetteIcon {
            animation: growHeight 0.3s ease forwards;
        }

        .borderBoxForeground {
            box-shadow: none;
            padding: 0;
            box-sizing: border-box;
            background: ${colorLightGrey};
            cursor: text;
            height: auto;
            display: flex;
            flex-direction: row;
            align-items: stretch;
            position: relative;
            width: 70%;
        }
        
        #foregroundColorInput,
        #backgroundColorInput {
            font-size: 1.25rem;
            font-weight: 500;
            box-shadow: none;
            margin: 0;
            padding: 0 0.5rem;
            box-sizing: border-box;
            border-radius: 0;
            border: none;
            background: transparent;
            color: ${colorDarkGrey};
            width: 100%;
            min-width: 0;
            text-overflow: ellipsis;
            outline: none;
            letter-spacing: normal;
        }
        
        #backgroundColorInput:focus,
        #foregroundColorInput:focus {
            box-shadow: inset 0 0 0 1px ${colorDarkGrey};
            border-color: ${colorDarkGrey};
        }
        
        .contrastResultsWrapper {
            padding: 0 20px 0 20px;
            margin: 0 0 20px 0;
            min-width: max-content;
        }

        .levelDescription {
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin: 0;
        }

        #contrastRatioLabel {
            margin: 0 auto;
        }

        .contrastRatioWrapper {
            width: 100%;
            margin: 15px 0 20px 0;
            display: flex;
            min-width: max-content;
            flex-direction: row;
            min-height: 72px;
            outline: 2px solid transparent;
        }

        .gridContainer {
            width: 100%;
            display: grid;
            grid-template-columns: 28% 28% 28%;
            justify-content: space-between;
        }

        .exampleText {
            box-sizing: border-box;
            padding: 11px 0 11px 20px;
            color: ${defaultForegroundColor};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }

        #largeTextExample {
            margin: 0;
            min-width: max-content;
        }
        
        #largeTextExample span:nth-child(2) {
            font-size: 1.5rem;
            font-weight: normal;
            margin: 0;
        }

        #largeTextExample span {
            font-weight: bold;
            font-size: 1.2rem;
        }

        #regularTextExample {
            margin: 0;
            font-size: 1rem;
        }

        .gridContainer p {
            margin: 0;
        }

        .textWrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .conformanceLevelSpan {
            margin: auto 0;
            display: flex;
        }
        
        .applyButton {
            color: ${colorDarkGrey};
            border: 1px solid ${colorApplyButtonBorder};
            background-color: ${colorLightGrey};
            cursor: pointer;
            display: inline-flex;
            padding: 0 16px;
            position: relative;
            font-size: 0.875rem;
            box-sizing: border-box;
            min-height: 32px;
            text-align: center;
            align-items: center;
            font-weight: 400;
            border-radius: 2px;
            text-decoration: none;
            -moz-user-select: none;
        }

        .applyButtonWrapper {
            display: flex;
        }

        .applyButtonSpan {
            color: ${colorDarkGrey};
            cursor: pointer;
            font-size: 0.875rem;
            text-align: center;
        }

        .caatLink {
            font-size: 0.75rem;
            margin: 0;
            color: ${colorDarkGrey};
        }

        .caatLink a {
            color: ${colorDarkGrey};
            padding: 4px 4px 2px 3px;
            margin: 0 0 0 -3px;
            text-decoration: underline 1px ${colorDarkGrey};
            transition: text-decoration 0.3s ease;
            text-decoration-skip-ink: none;
        }

        .caatLink a:focus {
            outline: none;
            box-shadow: inset 0 0 0 2px ${colorDarkGrey};
            border-color: ${colorDarkGrey};
            border-radius: 2px;
            text-decoration: underline 2px ${colorDarkGrey};
        }
        
        .caatLink a:hover {
            text-decoration: underline 2px ${colorDarkGrey};
        }

        .pipetteIcon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 30px;
            animation: none;
        }

        #backgroundDiv:hover .pipetteIcon {
            animation: growHeight 0.3s ease forwards;
        }

        .warningIcon svg {
            margin-bottom: auto;
        }

        #errorMessageWrapper {
            width: 100%;
            color: ${colorErrorRed};
            margin-top: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .errorMessageIcon {
            display: flex;
            justify-content: center;
        }

        .errorMessageDivider {
            width: 2px;
            background: ${colorErrorRed};
            display: inline-block;
            margin: 0 3px;
            height: 14px;
        }

        #errorMessage {
            margin: 0;
            font-size: 0.875rem;
            line-height: normal;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #copyMessageWrapper {
            color: ${colorCopyMessage};
            font-size: 0.875rem;
            position: absolute;
            bottom: 20px;
            right: 20px;
            padding: 0;
            z-index: 10000;
            width: 160px;
            text-align: right;
        }

        #copyMessage {
            padding: 0;
            margin: 0;
        }

        .visuallyhidden {
            clip: rect(0 0 0 0);
            clip-path: inset(50%);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;
        }

        @keyframes closeButtonHover {
            0% {
                height: 14px;
                width: 14px;
            }
            100% {
                height: 16px;
                width: 16px;
            }
        }

        @keyframes closeButtonHoverRight {
            0% {
                right: 4px;
            }
            100% {
                right: 3px;
            }
        }

        @keyframes growHeight {
            0% {
                height: 26px;
                width: 26px;
            }
            100% {
                height: 35px;
                width: 35px;
            }
        }

        @keyframes copyButtonInvert {
            0% {
                height: 24px;
                width: 25px;
            }
            100% {
                height: 30px;
                width: 31px;
            }
        }
    `;
    shadowRoot.appendChild(style);

    let offsetX = 0;
    let offsetY = 0;
    let currentContrastRatio = null;

    const head = shadowRoot.getElementById('toolbar');

    const regularTextAAThreshold = 4.5;
    const regularTextAAAThreshold = 7;
    const largeTextAAThreshold = 3;
    const largeTextAAAThreshold = 4.5;
    const nonTextAAThreshold = 3;

    let textSizeExamples = shadowRoot.getElementById('textSizeExamples');
    let caatFacialFeatures = shadowRoot.querySelectorAll('.caatFacialFeatures');
    let exampleText = shadowRoot.querySelectorAll('.exampleText');
    let contrastRatioSpan = shadowRoot.getElementById('contrastRatio');
    let contrastRatioLabel = shadowRoot.getElementById('contrastRatioLabel');
    let errorMessage = shadowRoot.getElementById('errorMessageWrapper');
    let invalidForegroundColor = false;
    let invalidBackgroundColor = false;

    function onMouseMove(e) {
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        head.style.cursor = 'grab';
    }

    head.addEventListener('mousedown', (e) => {
        const rect = popup.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        head.style.cursor = 'grabbing';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        e.preventDefault();
    });

    shadowRoot.getElementById('closePopup').addEventListener('click', () => {
        container.remove();
    })
    let currentButton = null;

    const invertWrapperColor = (event) => {
        const button = event.currentTarget;
        const svg = button.querySelector('svg');
        const path = svg.querySelector('path');

        const invertColor = (color)=> {
            const rgb = color.match(/\d+/g).map(Number);
            const inverted = rgb.map(value => 255 - value);
            return `rgb(${inverted.join(',')})`;
        }

        if (currentButton && currentButton !== button) {
            resetButtonColor(currentButton);
        }

        const currentColor = getComputedStyle(button).color;
        button.style.backgroundColor = 'currentColor';
        path.style.fill = invertColor(currentColor);

        currentButton = button;
    }

    const resetButtonColor = (button) => {
        if (!button) return;
        const svg = button.querySelector('svg');
        const path = svg.querySelector('path');

        button.style.backgroundColor = `${colorLightGrey}`;
        path.style.fill = 'currentColor';
    }
    const translateContrastRatio = (ratio, language) => {
        return ratio.toLocaleString(language);
    }

    class Color {
        constructor(color, background = "#FFFFFF") {
            if (color.startsWith("rgba")) {
                this.setRgba(color, background);
            } else if (color.length === 7 || color.length === 9) {
                this.setHex(color);
            } else {
                throw new Error("Ungültiges Farbformat");
            }
        }

        setHex(hex) {
            this.hex = Color.normalizeHex(hex);
            this.rgb = Color.hexToRgb(this.hex);
            this.luminance = this.calculateLuminance();
        }

        setRgba(rgba, background) {
            const fg = Color.parseRgba(rgba);
            if (!fg) throw new Error("Ungültiges RGBA-Format");

            const bg = Color.hexToRgb(Color.normalizeHex(background));
            this.rgb = Color.blendWithBackground(fg, bg);
            this.luminance = this.calculateLuminance();
        }

        static normalizeHex(hex) {
            hex = hex.replace(/^#/, "");
            if (hex.length === 6) {
                return `#${hex}`;
            } else if (hex.length === 8) {
                return `#${hex}`;
            }
            return hex;
        }

        static hexToRgb(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;

            return { r, g, b, a };
        }

        static parseRgba(rgba) {
            const match = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);
            if (!match) return null;

            return {
                r: parseInt(match[1], 10),
                g: parseInt(match[2], 10),
                b: parseInt(match[3], 10),
                a: parseFloat(match[4])
            };
        }

        static blendWithBackground(fg, bg) {
            const alpha = fg.a;
            return {
                r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
                g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
                b: Math.round(fg.b * alpha + bg.b * (1 - alpha))
            };
        }

        static srgbToLinear(value) {
            const v = value / 255;
            return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        }

        calculateLuminance() {
            const { r, g, b } = this.rgb;
            return (
                0.2126 * Color.srgbToLinear(r) +
                0.7152 * Color.srgbToLinear(g) +
                0.0722 * Color.srgbToLinear(b)
            );
        }

        contrastRatio(otherColor) {
            const brighter = Math.max(this.luminance, otherColor.luminance);
            const darker = Math.min(this.luminance, otherColor.luminance);
            return Number(((brighter + 0.05) / (darker + 0.05)).toFixed(2));
        }
    }

    function getRgbaColor(foregroundColor) {
        if (foregroundColor.startsWith("rgba")) {
            return foregroundColor;
        } else if (foregroundColor.startsWith("#")) {
            const hex = Color.normalizeHex(foregroundColor);
            const { r, g, b, a } = Color.hexToRgb(hex);
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        } else {
            console.warn("Ungültige Farbe:", foregroundColor);
            return "rgba(0, 0, 0, 1)";
        }
    }

    const isEyeDropperAvailable = () => {
        return 'EyeDropper' in window;
    }

    const copyToClipboard = (headline, label, level, requiredRatio, event) => {
        const copyTemplateData = {
            contentType: translations.copyMessage[headline],
            contrastValue: translateContrastRatio(currentContrastRatio, userLanguage),
            foregroundColor: validateColor(currentForegroundColor),
            backgroundColor: validateColor(currentBackgroundColor),
            label: label,
            level: level,
            requiredContrast: requiredRatio
        }
        const clipboardText = currentContrastRatio >= requiredRatio ? translations.copyMessage.clipboardTextPassed.replace(/{(.*?)}/g, (_, key) => copyTemplateData[key] || '') : translations.copyMessage.clipboardTextFailed.replace(/{(.*?)}/g, (_, key) => copyTemplateData[key] || '');

        const button = event.currentTarget;
        const textToCopy = button.getAttribute('data-text');

        const existingMessage = shadowRoot.getElementById('copyMessage');
        if (existingMessage) {
            existingMessage.innerText = textToCopy + ' ' + translations.copyMessage.template;
        }
        navigator.clipboard.writeText(clipboardText)
            .catch(err => {
                shadowRoot.getElementById('status').textContent = 'Failed to copy!';
                console.error('Error:', err);
            });
    }

    const createRef = (initialValue = null) => ({current: initialValue});
    const createElement = (t, props, ...children) => {
        const el = document.createElement(t);
        Object.entries(props ?? {}).forEach(([k, v]) => {
            if (k === 'ref') {
                v.current = el;
                return;
            }
            if (k.startsWith('on')) {
                el.addEventListener(k.slice(2).toLowerCase(), v);
                return;
            }
            if (k === 'style') {
                Object.entries(v ?? {}).forEach(([styleKey, styleValue]) => {
                    el.style[styleKey] = styleValue;
                });
                return;
            }
            if (k === 'class') {
                el.className = v;
                return;
            }
            if (k.includes('-') || k.startsWith('data') || k.startsWith('aria')) {
                el.setAttribute(k, v);
                return;
            }
            el[k] = v;
        });
        el.append(...children);
        return el;
    };

    const createColorPicker = (layer, onChange, onError) => {
        const textFieldRef = createRef();
        const colorFieldRef = createRef();

        const onChangeTextFieldValue = (e, layer) => {
            const newValue = e.target.value;
            let validatedColor = validateColor(newValue);

            if (!validatedColor) {
                onError(true);
                textFieldRef.current.setAttribute('aria-invalid', 'true');
            } else {
                if (layer === 'background' && validatedColor.length === 9) {
                    validatedColor = validatedColor.slice(0, 7);
                }
                colorFieldRef.current.style.backgroundColor = validatedColor;
                onChange(validatedColor);
                onError(false);
                textFieldRef.current.setAttribute('aria-invalid', 'false');
            }
        };


        const onChangeColorPickerValue = (e) => {
             textFieldRef.current.value = e.target.value;
             colorFieldRef.current.style.backgroundColor = e.target.value;
             onChange(e.target.value);
        }

        const defaultColor = layer === 'background' ? currentBackgroundColor : currentForegroundColor;
        return createElement('fieldset', {id: `${layer}PickerWrapper`},
            createElement('legend', { id: `${layer}Label` }, translations[layer],
                createElement('span', {class: 'visuallyhidden'}, `${translations.color} `)),
            createElement('div', {class: `${layer}InputWrapper`},
                createElement('div', {id: `${layer}Div`, innerHTML: pipetteIcon, ref: colorFieldRef},
                    createElement('label', { class: 'visuallyhidden', id: 'colorPickerLabel' }, translations.colorPickerInputLabel),
                    createElement('input', {
                        id: `${layer}Color`,
                        type: 'color',
                        value: defaultColor,
                        onInput: onChangeColorPickerValue,
                        'aria-labelledby': `${layer}Label colorPickerLabel errorMessageWrapper`,
                        'aria-invalid': 'false',
                    })
                ),
                createElement('div', {class: `borderBoxForeground`},
                    createElement('label', { class: 'visuallyhidden', id: 'hexCodeLabel' }, translations.colorInputLabel),
                    createElement('input', {
                        id: `${layer}ColorInput`,
                        type: 'text',
                        value: defaultColor,
                        onChange: (e) => onChangeTextFieldValue(e, layer),
                        ref: textFieldRef,
                        'aria-labelledby': `${layer}Label hexCodeLabel errorMessageWrapper`,
                        'aria-invalid': 'false',
                    })
                )
            ),
        );
    }

    const createConformanceLevelWrapper = (data, headline) => {
        const button = createElement('button', {
            class: 'clipboardWrapper',
            'aria-label': translations.ariaLabels[data.level],
            'data-text': translations.copyMessage[data.level],
            innerHTML: clipboardSVG,
            onClick: (event) => copyToClipboard(headline, data.label, translations.copyMessage[data.level], data.ratio, event),
        });

        button.addEventListener('mousedown', invertWrapperColor);
        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                invertWrapperColor(event);
            }
        });

        button.addEventListener('mouseup', () => resetButtonColor(button));
        button.addEventListener('keyup', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                resetButtonColor(button);
            }
        });
        button.addEventListener('mouseleave', () => resetButtonColor(button));

        return createElement('li', {},
            createElement('div', { class: 'levelResult' },
                createElement('span', { class: 'conformanceLevelSpan', id: data.level, innerHTML: contrastSufficientSVG }),
                createElement('p', {},
                    createElement('span', { class: 'visuallyhidden', id: `${data.level}Alt` },),
                    data.label + ' ',
                    createElement('span', { class: 'visuallyhidden' }, translations.requiredRatio.replace(/{(.*?)}/g, data.ratio)),
                    createElement('span', { 'aria-hidden':'true' }, '(' + data.ratio + ':1)')
                ),
                button
            )
        );
    }

    const createContrastLevelWrapper =(data, headline, pText) => {
        const listItems = [];

        for (let i = 0; i < data.length; i++) {
            listItems.push(createConformanceLevelWrapper(data[i], headline));
        }

        return createElement('div', { class: 'contrastLevelWrapper' },
            createElement('h3', { class: 'levelDescription' }, translations[headline]),
            pText ? createElement('p', { class: 'largeTextDescription' }, pText) : '',
            createElement('ul', { id: 'levelListRegular' }, ...listItems)
        );
    }

    const copyMessage = () => {
        return createElement('div', {id: 'copyMessageWrapper'},
            createElement('p', {
                id: 'copyMessage',
                'aria-live': 'polite',
                'aria-atomic': 'true'
            }),
        );
    }

    const validateColor = (value) => {
        const tester = document.createElement('i');
        tester.style.color = value;

        if (!tester.style.color) {
            return null;
        }

        document.body.appendChild(tester);
        const computedColor = window.getComputedStyle(tester).color;
        document.body.removeChild(tester);

        if (!computedColor || computedColor === 'rgba(0, 0, 0, 0)') {
            return null;
        }

        const rgbaMatch = computedColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)$/);

        if (rgbaMatch) {
            const r = parseInt(rgbaMatch[1]);
            const g = parseInt(rgbaMatch[2]);
            const b = parseInt(rgbaMatch[3]);
            const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;

            const aHex = Math.round(a * 255).toString(16).padStart(2, '0');
            if (a === 1) {
                return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            }
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${aHex}`;
        }

        const rgbMatch = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);

            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }

        return null;
    };

    let currentForegroundColor = validateColor(defaultForegroundColor);
    let currentBackgroundColor = validateColor(defaultBackgroundColor);
    const updateContrastRatio = (foregroundColor, backgroundColor) => {
        if (!foregroundColor || !backgroundColor) {
            return;
        }

        currentContrastRatio = new Color(getRgbaColor(currentForegroundColor), currentBackgroundColor).contrastRatio(new Color(currentBackgroundColor));
        contrastRatioSpan.innerHTML = translateContrastRatio(currentContrastRatio, userLanguage);
        contrastRatioLabel.innerHTML = `${translations.contrastRatio} ${translateContrastRatio(currentContrastRatio, userLanguage)} ${translations.ratioWordTranslator} 1`;

        const thresholds = [
            {id: 'regularTextAA', value: regularTextAAThreshold},
            {id: 'regularTextAAA', value: regularTextAAAThreshold},
            {id: 'largeTextAA', value: largeTextAAThreshold},
            {id: 'largeTextAAA', value: largeTextAAAThreshold},
            {id: 'nonTextAA', value: nonTextAAThreshold},
        ];
        thresholds.forEach(({ id, value }) => {
            const isSufficient = currentContrastRatio >= value;
            shadowRoot.getElementById(id).innerHTML = isSufficient ? contrastSufficientSVG : contrastInsufficientSVG;
            shadowRoot.getElementById(`${id}Alt`).innerHTML = isSufficient ? translations.successIconLabel : translations.failedIconLabel;
        });
    };

    shadowRoot.getElementById('colorPickers').append(
        createColorPicker(
            'foreground',
            (newColor) => {
                currentForegroundColor = newColor;
                currentContrastRatio = new Color(currentForegroundColor).contrastRatio(new Color(currentBackgroundColor));
                exampleText[0].style.color = newColor;
                textSizeExamples.style.color = newColor;
                updateContrastRatio(currentForegroundColor, currentBackgroundColor);
            },
            (isInvalid) => {
                if (isInvalid) {
                    invalidForegroundColor = true;
                    errorMessage.innerHTML = `
                    <div class="errorMessageIcon">${errorIcon}</div>
                    <span class="errorMessageDivider"></span>
                    <p id="errorMessage">${translations.errorMessage}</p>`;
                } else {
                    invalidForegroundColor = false;
                    if (!invalidForegroundColor && !invalidBackgroundColor)
                        errorMessage.innerHTML = '';
                }
            }
        ),
        createColorPicker(
            'background',
            (newColor) => {
                currentBackgroundColor = newColor;
                textSizeExamples.style.backgroundColor = currentBackgroundColor;
                caatFacialFeatures[0].style.fill = currentBackgroundColor;
                caatFacialFeatures.forEach((feature) => {
                    feature.style.stroke = currentBackgroundColor;
                });
                updateContrastRatio(currentForegroundColor, currentBackgroundColor);
                currentContrastRatio = new Color(currentForegroundColor).contrastRatio(new Color(currentBackgroundColor));
            },
            (isInvalid) => {
                if (isInvalid) {
                    invalidBackgroundColor = true;
                    errorMessage.innerHTML = `
                    <div class="errorMessageIcon">${errorIcon}</div>
                    <span class="errorMessageDivider"></span>
                    <p id="errorMessage">${translations.errorMessage}</p>`;
                } else {
                    invalidBackgroundColor = false;
                    if (!invalidForegroundColor && !invalidBackgroundColor)
                        errorMessage.innerHTML = '';
                }
            }
        )
    );

    shadowRoot.getElementById('contrastResultWrapper').append(
        createContrastLevelWrapper(
            [
                { label: "AA", ratio: translateContrastRatio(4.5, userLanguage), level: 'regularTextAA' },
                { label: "AAA", ratio: 7, level: 'regularTextAAA' }
            ],
            'regularText'
        ),
        createContrastLevelWrapper(
            [
                { label: "AA", ratio: 3, level: 'largeTextAA' },
                { label: "AAA", ratio: translateContrastRatio(4.5, userLanguage), level: 'largeTextAAA' }
            ],
            'largeText',
            translations.largeTextDescription
        ),
        createContrastLevelWrapper(
            [
                { label: "AA", ratio: 3, level: 'nonTextAA' }
            ],
            'nonText'
        )
    );

    shadowRoot.getElementById('popup').appendChild(copyMessage());

    updateContrastRatio('black', 'white');

    isEyeDropperAvailable() || (shadowRoot.getElementById('apiWarning').style.display = 'flex');
})();
