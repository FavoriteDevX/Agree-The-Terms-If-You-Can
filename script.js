document.addEventListener('DOMContentLoaded', () => {
    // Painéis de Navegação
    const stepEmail = document.getElementById('step-email');
    const stepTerms = document.getElementById('step-terms');
    const googleCard = document.getElementById('google-card');
    const successCard = document.getElementById('success-card');
    
    // Botões e Inputs
    const btnNext = document.getElementById('btn-next');
    const btnSubmit = document.getElementById('btn-submit');
    const inputEmail = document.getElementById('input-email');
    const chkTos = document.getElementById('chk-tos');
    const wrapperTos = document.getElementById('target-checkbox-wrapper');
    const userEmailDisplay = document.getElementById('user-email-display');

    // Elementos do CAPTCHA
    const captchaBox = document.getElementById('captcha-box');
    const captchaPrompt = document.getElementById('captcha-prompt');
    const captchaGrid = document.getElementById('captcha-grid');
    const btnCaptchaVerify = document.getElementById('btn-captcha-verify');
    const actualTermsArea = document.getElementById('actual-terms-area');

    let currentStage = 0; // Precisa passar por 3 estágios (0, 1, 2)
    
    // Trechos de código satíricos para preencher o CAPTCHA
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

    // CORREÇÃO: Transição direta sem travar a thread de execução do navegador
    btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Garante um valor padrão caso o campo esteja vazio
        const emailValue = inputEmail.value.trim();
        userEmailDisplay.textContent = emailValue ? emailValue : "davischulze113@gmail.com";

        // Altera as classes de visibilidade
        stepEmail.classList.add('hidden');
        stepTerms.classList.remove('hidden');
        
        // Inicializa o primeiro desafio do CAPTCHA
        loadCaptchaChallenge();
    });

    // Renderiza a matriz do CAPTCHA dinamicamente
    function loadCaptchaChallenge() {
        captchaGrid.innerHTML = '';
        captchaPrompt.textContent = captchaChallenges[currentStage].prompt;
        
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.className = 'captcha-square';
            square.textContent = codeSnippets[(i + currentStage * 3) % codeSnippets.length];
            
            square.style.backgroundPosition = `${(i % 3) * 50}% ${Math.floor(i / 3) * 50}%`;
            square.style.backgroundImage = "linear-gradient(135deg, rgba(200,200,200,0.1) 25%, transparent 25%)";
            
            square.addEventListener('click', () => {
                square.classList.toggle('selected');
            });
            captchaGrid.appendChild(square);
        }
    }

    // Avança pelas etapas do CAPTCHA
    btnCaptchaVerify.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (currentStage < 2) {
            currentStage++;
            loadCaptchaChallenge();
        } else {
            // Libera a área com os botões e caixas que fogem
            captchaBox.classList.add('hidden');
            actualTermsArea.classList.remove('hidden');
        }
    });

    // Lógica de movimentação (Runaway) do Card e dos botões
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

    // Ativa a fuga caso o usuário tente interagir sem marcar a caixa de seleção
    wrapperTos.addEventListener('mouseenter', () => { if (!chkTos.checked) makeElementRunaway(googleCard); });
    wrapperTos.addEventListener('click', (e) => { if (!chkTos.checked) { e.preventDefault(); makeElementRunaway(googleCard); } });

    const checkButtonEvasion = (e) => {
        if (!chkTos.checked) { e.preventDefault(); makeElementRunaway(btnSubmit); }
    };
    btnSubmit.addEventListener('mouseenter', checkButtonEvasion);
    btnSubmit.addEventListener('mouseover', checkButtonEvasion);
    btnSubmit.addEventListener('click', checkButtonEvasion);

    // Conclui e mostra o painel de sucesso final
    btnSubmit.addEventListener('mouseup', () => {
        if (chkTos.checked) {
            googleCard.classList.add('hidden');
            successCard.classList.remove('hidden');
            btnSubmit.classList.remove('runaway-node');
            googleCard.classList.remove('runaway-node');
        }
    });
});
