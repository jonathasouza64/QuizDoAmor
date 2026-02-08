const btnNao = document.querySelector(".btn-nao");
const btnYes = document.querySelector(".btn-yes");

// GARANTE TAMANHO MÍNIMO DO BOTÃO NÃO
btnNao.style.minWidth = "80px";

// VERIFICA SE É DISPOSITIVO MOBILE
const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

// FUNÇÃO PARA FAZER BOTÃO SIM FICAR ROXO AO CLICAR (APENAS BOTÃO SIM)
function makeYesButtonPurpleOnClick(button) {
    if (isMobile) {
        // VERSÃO MOBILE - TOUCH (SEM preventDefault)
        button.addEventListener('touchstart', function() {
            this.classList.add('active-click');
            this.style.backgroundColor = '#570657';
            this.style.transform = 'scale(0.92)';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('active-click');
                this.style.backgroundColor = '';
                this.style.transform = '';
            }, 200);
        });
        
        button.addEventListener('touchcancel', function() {
            this.classList.remove('active-click');
            this.style.backgroundColor = '';
            this.style.transform = '';
        });
    } else {
        // VERSÃO PC - MOUSE
        button.addEventListener('mousedown', function() {
            this.classList.add('active-click');
        });
        
        button.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.classList.remove('active-click');
            }, 200);
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('active-click');
        });
    }
}

// Aplica efeito roxo APENAS ao botão Sim
makeYesButtonPurpleOnClick(btnYes);

// Redireciona para a próxima página ao clicar em "Sim"
btnYes.addEventListener("click", function () {
    const nextPage = "corpo.html"; // Caminho da nova página
    window.location.href = nextPage;
});

// Função para calcular a distância entre dois pontos
function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Função para mover o botão "Não"
function moveButton() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newTop = Math.random() * (windowHeight - btnNao.offsetHeight);
    let newLeft = Math.random() * (windowWidth - btnNao.offsetWidth);

    newTop = Math.max(0, Math.min(newTop, windowHeight - btnNao.offsetHeight));
    newLeft = Math.max(0, Math.min(newLeft, windowWidth - btnNao.offsetWidth));

    btnNao.style.position = "absolute";
    btnNao.style.top = `${newTop}px`;
    btnNao.style.left = `${newLeft}px`;
    
    // GARANTE QUE O BOTÃO MANTENHA O TAMANHO MÍNIMO MESMO QUANDO MOVIDO
    btnNao.style.minWidth = "80px";

    // Adiciona o efeito de vibração ao botão "Sim"
    btnYes.classList.add("btn-vibrate");

    // Remove o efeito de vibração após a animação
    setTimeout(() => {
        btnYes.classList.remove("btn-vibrate");
    }, 600);
}

// Eventos de movimento para o botão "Não"
document.addEventListener("mousemove", function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const btnRect = btnNao.getBoundingClientRect();
    const distance = calculateDistance(
        mouseX,
        mouseY,
        btnRect.left + btnRect.width / 2,
        btnRect.top + btnRect.height / 2
    );

    // Se a distância entre o mouse e o botão "Não" for menor que 50px, mova o botão
    if (distance < 50) {
        moveButton();
    }
});

btnNao.addEventListener("touchstart", function (e) {
    e.preventDefault(); // APENAS para o botão Não podemos prevenir
    moveButton();
});

// Movimentação automática do botão "Não" em intervalos
setInterval(moveButton, 1500);

// AJUSTA TAMANHO MÍNIMO PARA MOBILE
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        btnNao.style.minWidth = "70px";
    } else {
        btnNao.style.minWidth = "80px";
    }
});

// INICIALIZA COM O TAMANHO CORRETO
if (window.innerWidth <= 768) {
    btnNao.style.minWidth = "70px";
}

// CSS - APENAS para o botão Sim ficar roxo
const style = document.createElement('style');
style.textContent = `
    .btn-yes.active-click {
        background-color: #570657 !important;
        transform: scale(0.95);
    }
    
    @media (max-width: 768px) {
        .btn-yes:active {
            background-color: #570657 !important;
            transform: scale(0.92) !important;
        }
    }
`;
document.head.appendChild(style);