document.addEventListener('DOMContentLoaded', () => {
    // Navigation elements
    const stepEmail = document.getElementById('step-email');
    const stepTerms = document.getElementById('step-terms');
    const googleCard = document.getElementById('google-card');
    const successCard = document.getElementById('success-card');
    
    // Buttons & Inputs
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    const inputEmail = document.getElementById('input-email');
    const chkTos = document.getElementById('chk-tos');
    const wrapperTos = document.getElementById('target-checkbox-wrapper');
    const userEmailDisplay = document.getElementById('user-email-display');

    // CAPTCHA Mechanics Setup
    const captchaBox = document.getElementById('captcha-box');
    const captchaPrompt = document.getElementById('captcha-prompt');
    const captchaGrid = document.getElementById('captcha-grid');
    const btnCaptchaVerify = document.getElementById('btn-captcha-verify');
    const actualTermsArea = document.getElementById('actual-terms-area');

    let currentStage = 0; // Requires passing 3 challenges (0, 1, 2)
    
    // Fake complex dev code blocks to fill captcha squares matrix
    const codeSnippets = [
        "function fix(){\nreturn true;}", "/* TODO: fix */\nif(false){}", "npm install\nWARN 404", 
        "<div>\n  <p>\n</div>", "const res = \nawait fetch()", "window.locatn\n= undef",
        "<?php\necho \$b;", "import os\nprint(dir)", "git commit\n-m 'bug'", "  margin: -2px;\n  float: left;",
        "// broken API\nwhile(true){}", "console.log(\n[object Obj])"
    ];

    const captchaChallenges = [
        { prompt: "squares with BUGS" },
        { prompt: "MISSING SEMICOLONS (;)" },
        { prompt: "LEGACY STACKOVERFLOW CODE" }
    ];

    // STEP 1: Fixed Identification Trigger Transition
    btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Basic check if email input has content
        if (!inputEmail.value || !inputEmail.checkValidity()) {
            inputEmail.style.borderColor = "#f85149";
            inputEmail.focus();
            return; // Stops transition if it's completely invalid
        }
        
        // Pass email text downstream to victory card feed screen
        userEmailDisplay.textContent = inputEmail.value;

        // Switch panel visibility states smoothly
        stepEmail.classList.add('hidden');
        stepTerms.classList.remove('hidden');
        loadCaptchaChallenge();
    });

    // Generate functional matrix interface elements
    function loadCaptchaChallenge() {
        captchaGrid.innerHTML = '';
        captchaPrompt.textContent = captchaChallenges[currentStage].prompt;
        
        // Shuffle and fill snippets
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.className = 'captcha-square';
            square.textContent = codeSnippets[(i + currentStage * 3) % codeSnippets.length];
            
            // Re-map backgrounds to look like one segmented puzzle wallpaper
            square.style.backgroundPosition = `${(i % 3) * 50}% ${Math.floor(i / 3) * 50}%`;
            square.style.backgroundImage = "linear-gradient(135deg, rgba(200,200,200,0.1) 25%, transparent 25%)";
            
            square.addEventListener('click', () => {
                square.classList.toggle('selected');
            });
            captchaGrid.appendChild(square);
        }
    }

    // CAPTCHA Validation click response loop
    btnCaptchaVerify.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Anti-human prank rule: Even if they click right, we advance stage until 3 checks pass
        if (currentStage < 2) {
            currentStage++;
            loadCaptchaChallenge();
        } else {
            // Unlocked the runaway fields phase
            captchaBox.classList.add('hidden');
            actualTermsArea.classList.remove('hidden');
        }
    });

    /**
     * Evasive position calculation engine preventing interface cursor selection
     */
    const makeElementRunaway = (element) => {
        if (!element.classList.contains('runaway-node')) {
            const currentRect = element.getBoundingClientRect();
            element.style.width = `${currentRect.width}px`;
            element.style.left = `${currentRect.left}px`;
            element.style.top = `${currentRect.top}px`;
            element.classList.add('runaway-node');
        }

        const buffer = 40;
        const maxX = window.innerWidth - element.offsetWidth - buffer;
        const maxY = window.innerHeight - element.offsetHeight - buffer;

        let randomX = Math.max(buffer, Math.floor(Math.random() * maxX));
        let randomY = Math.max(buffer, Math.floor(Math.random() * maxY));

        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
    };

    // PRANK ACTIONS: Fleeing behaviors active only after passing Captcha wall
    wrapperTos.addEventListener('mouseenter', () => { if (!chkTos.checked) makeElementRunaway(googleCard); });
    wrapperTos.addEventListener('click', (e) => { if (!chkTos.checked) { e.preventDefault(); makeElementRunaway(googleCard); } });

    const checkButtonEvasion = (e) => {
        if (!chkTos.checked) { e.preventDefault(); makeElementRunaway(btnSubmit); }
    };
    btnSubmit.addEventListener('mouseenter', checkButtonEvasion);
    btnSubmit.addEventListener('mouseover', checkButtonEvasion);
    btnSubmit.addEventListener('click', checkButtonEvasion);

    // STEP 3: Handle Final Transition
    btnSubmit.addEventListener('mouseup', () => {
        if (chkTos.checked) {
            googleCard.classList.add('hidden');
            successCard.classList.remove('hidden');
            btnSubmit.classList.remove('runaway-node');
            googleCard.classList.remove('runaway-node');
        }
    });
});
