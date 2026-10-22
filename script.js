document.addEventListener('DOMContentLoaded', () => {
    const googleCard = document.getElementById('google-card');
    const successCard = document.getElementById('success-card');
    const chkTos = document.getElementById('chk-tos');
    const btnSubmit = document.getElementById('btn-submit');
    const wrapperTos = document.getElementById('target-checkbox-wrapper');

    /**
     * Engine helper calculating evasive position metrics inside safe zone window limits
     */
    const makeElementRunaway = (element) => {
        if (!element.classList.contains('runaway-node')) {
            // Read initial layout sizes before locking to fixed screen positions
            const currentRect = element.getBoundingClientRect();
            element.style.width = `${currentRect.width}px`;
            element.style.left = `${currentRect.left}px`;
            element.style.top = `${currentRect.top}px`;
            element.classList.add('runaway-node');
        }

        const safetyBuffer = 30;
        const widthBound = window.innerWidth - element.offsetWidth - safetyBuffer;
        const heightBound = window.innerHeight - element.offsetHeight - safetyBuffer;

        let dynamicX = Math.floor(Math.random() * widthBound);
        let dynamicY = Math.floor(Math.random() * heightBound);

        // Standard validation check protecting viewport anchors
        dynamicX = Math.max(safetyBuffer, dynamicX);
        dynamicY = Math.max(safetyBuffer, dynamicY);

        element.style.left = `${dynamicX}px`;
        element.style.top = `${dynamicY}px`;
    };

    // ACTION A: Make entire main layout card evade user if they try to check the boxed terms
    wrapperTos.addEventListener('mouseenter', () => {
        if (!chkTos.checked) {
            makeElementRunaway(googleCard);
        }
    });

    wrapperTos.addEventListener('click', (e) => {
        if (!chkTos.checked) {
            e.preventDefault();
            makeElementRunaway(googleCard);
        }
    });

    // ACTION B: Make submit button fly if terms are bypassed or unchecked
    const checkButtonEvasion = (e) => {
        if (!chkTos.checked) {
            e.preventDefault();
            makeElementRunaway(btnSubmit);
        }
    };

    btnSubmit.addEventListener('mouseenter', checkButtonEvasion);
    btnSubmit.addEventListener('mouseover', checkButtonEvasion);
    btnSubmit.addEventListener('click', checkButtonEvasion);

    // ACTION C: Handle winning state transition once click conditions are verified
    btnSubmit.addEventListener('mouseup', () => {
        if (chkTos.checked) {
            googleCard.classList.add('hidden');
            successCard.classList.remove('hidden');
            
            // Clean up runaway nodes transformations
            btnSubmit.classList.remove('runaway-node');
            googleCard.classList.remove('runaway-node');
        }
    });
});
