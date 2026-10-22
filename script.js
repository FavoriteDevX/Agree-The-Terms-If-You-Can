document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const cookieBanner = document.getElementById('cookie-banner');
    const devDashboard = document.getElementById('dev-dashboard');

    // Função que faz o botão fugir
    const escapeButton = (e) => {
        if (btnNo.style.position !== 'fixed') {
            btnNo.style.position = 'fixed';
            btnNo.style.zIndex = '10000';
        }

        const padding = 20;
        const maxX = window.innerWidth - btnNo.offsetWidth - padding;
        const maxY = window.innerHeight - btnNo.offsetHeight - padding;

        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);

        randomX = Math.max(padding, randomX);
        randomY = Math.max(padding, randomY);

        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    };

    // Ativa a fuga tanto no passar do mouse quanto no clique
    btnNo.addEventListener('mouseenter', escapeButton);
    btnNo.addEventListener('mouseover', escapeButton);
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        escapeButton();
    });

    // Evento quando clica em "Yes"
    btnYes.addEventListener('click', () => {
        cookieBanner.style.display = 'none';
        devDashboard.classList.remove('hidden');
    });
});
