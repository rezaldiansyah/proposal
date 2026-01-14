/**
 * My Projects - Presentation Platform
 * Main JavaScript with PIN Protection
 */

// ================================================
// PIN MODAL LOGIC
// ================================================
const pinModal = document.getElementById('pin-modal');
const pinInputs = document.querySelectorAll('.pin-input');
const pinError = document.getElementById('pin-error');
const pinSubmit = document.getElementById('pin-submit');
const modalClose = document.getElementById('modal-close');
const modalProjectName = document.getElementById('modal-project-name');

let currentProject = null;
let currentPin = null;
let targetUrl = null;

// Project URLs mapping
const projectUrls = {
    'habits-media': '/projects/habits-media/',
    'iclean': '/projects/iclean/'
};

// Open PIN modal
function openPinModal(projectId, projectName, pin, url) {
    currentProject = projectId;
    currentPin = pin;
    targetUrl = url;
    modalProjectName.textContent = projectName;
    pinModal.classList.add('active');
    pinError.style.display = 'none';

    // Clear inputs
    pinInputs.forEach(input => {
        input.value = '';
    });

    // Focus first input
    setTimeout(() => pinInputs[0].focus(), 100);
}

// Close PIN modal
function closePinModal() {
    pinModal.classList.remove('active');
    currentProject = null;
    currentPin = null;
    targetUrl = null;
}

// Handle PIN input
pinInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        const value = e.target.value;

        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            e.target.value = '';
            return;
        }

        // Move to next input
        if (value && index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
        }

        // Auto-submit when all filled
        if (index === pinInputs.length - 1 && value) {
            setTimeout(verifyPin, 100);
        }
    });

    input.addEventListener('keydown', (e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            pinInputs[index - 1].focus();
        }

        // Handle Enter
        if (e.key === 'Enter') {
            verifyPin();
        }
    });

    // Handle paste
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        pastedData.split('').forEach((char, i) => {
            if (pinInputs[i]) {
                pinInputs[i].value = char;
            }
        });
        if (pastedData.length === 6) {
            setTimeout(verifyPin, 100);
        }
    });
});

// Verify PIN
function verifyPin() {
    const enteredPin = Array.from(pinInputs).map(input => input.value).join('');

    console.log('Entered PIN:', enteredPin);
    console.log('Expected PIN:', currentPin);
    console.log('Target URL:', targetUrl);

    if (enteredPin === currentPin) {
        // Success - save URL before closing (closePinModal resets targetUrl)
        const redirectUrl = targetUrl;
        closePinModal();
        if (redirectUrl) {
            console.log('Redirecting to:', redirectUrl);
            window.location.href = redirectUrl;
        }
    } else {
        // Error - shake and show error
        pinError.style.display = 'block';
        document.querySelector('.modal__content').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.modal__content').classList.remove('shake');
        }, 500);

        // Clear inputs
        pinInputs.forEach(input => input.value = '');
        pinInputs[0].focus();
    }
}

// Event listeners
pinSubmit.addEventListener('click', verifyPin);
modalClose.addEventListener('click', closePinModal);
pinModal.querySelector('.modal__backdrop').addEventListener('click', closePinModal);

// Handle protected card clicks
document.querySelectorAll('.card--protected').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.dataset.project;
        const projectPin = card.dataset.pin;
        const projectName = card.querySelector('.card__title').textContent;
        const projectUrl = projectUrls[projectId];

        openPinModal(projectId, projectName, projectPin, projectUrl);
    });
});

// ================================================
// SCROLL ANIMATIONS
// ================================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard shortcut to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pinModal.classList.contains('active')) {
        closePinModal();
    }
});

// Console branding
console.log(
    '%c My Projects ',
    'background: #0a0a0a; color: #38bdf8; font-size: 20px; font-weight: bold; padding: 10px 20px;'
);

export default {};
