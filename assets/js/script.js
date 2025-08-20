// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Add interactivity to form inputs
function initializeFormInputs() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-bar input, .search-box');
    searchInputs.forEach(searchBox => {
        if (searchBox) {
            searchBox.addEventListener('input', function() {
                console.log('Searching for:', this.value);
            });

            searchBox.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = this.value.trim();
                    if (searchTerm) {
                        alert(`Mencari: ${searchTerm}`);
                    }
                }
            });
        }
    });
}

// =============================================================================
// PROFILE FUNCTIONALITY
// =============================================================================

function initializeProfile() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profil berhasil disimpan!');
            window.location.href = 'profile.html';
        });
    }
}

// =============================================================================
// FORM VALIDATION
// =============================================================================

function validateForm(e) {
    e.preventDefault();
    let valid = true;

    document.querySelectorAll('.form-group').forEach(group => {
        const input = group.querySelector('input, select');
        const error = group.querySelector('.error');
        if (!input || !error) return;
        if (input.type === 'checkbox') return;

        if (!input.value.trim()) {
            error.style.display = 'block';
            valid = false;
        } else {
            error.style.display = 'none';
        }
    });

    // Validasi tanggal lahir (usia)
    const tgl = document.getElementById('tgl-lahir');
    if (tgl) {
        const errorTgl = tgl.parentNode.querySelector('.error');
        if (tgl.value) {
            const usia = new Date().getFullYear() - new Date(tgl.value).getFullYear();
            if (usia < 14 || usia > 65) {
                errorTgl.style.display = 'block';
                valid = false;
            } else {
                errorTgl.style.display = 'none';
            }
        }
    }

    // Validasi Nomor HP (harus 12 digit angka)
    const noHp = document.getElementById('hp');
    if (noHp) {
        const errorHp = noHp.parentNode.querySelector('.error');
        if (!/^\d{12}$/.test(noHp.value.trim())) {
            errorHp.style.display = 'block';
            valid = false;
        } else {
            errorHp.style.display = 'none';
        }
    }

    // Validasi Level Pelatihan (harus 1)
    const levelContainer = document.querySelector('#level');
    if (levelContainer) {
        const level = [...levelContainer.querySelectorAll('input:checked')];
        const errLevel = levelContainer.parentNode.querySelector('.error');
        if (level.length !== 1) {
            errLevel.style.display = 'block';
            valid = false;
        } else {
            errLevel.style.display = 'none';
        }
    }

    // Validasi Jadwal Pelatihan (harus 2)
    const jadwalContainer = document.querySelector('#jadwal');
    if (jadwalContainer) {
        const jadwal = [...jadwalContainer.querySelectorAll('input:checked')];
        const errJadwal = jadwalContainer.parentNode.querySelector('.error');
        if (jadwal.length !== 2) {
            errJadwal.style.display = 'block';
            valid = false;
        } else {
            errJadwal.style.display = 'none';
        }
    }

    if (valid) {
        const popup = document.getElementById('popupSuccess');
        if (popup) {
            popup.style.display = 'flex';
        }
    }

    return valid;
}

// Initialize checkbox limitations
function initializeCheckboxLimitations() {
    // Batasi checkbox level (maks 1)
    const levelCheckboxes = document.querySelectorAll('#level input[type="checkbox"]');
    levelCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const checked = document.querySelectorAll('#level input[type="checkbox"]:checked');
            if (checked.length > 1) {
                this.checked = false;
                alert("Hanya boleh memilih satu level pelatihan.");
            }
        });
    });

    // Batasi checkbox jadwal (maks 2)
    const jadwalCheckboxes = document.querySelectorAll('#jadwal input[type="checkbox"]');
    jadwalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const checked = document.querySelectorAll('#jadwal input[type="checkbox"]:checked');
            if (checked.length > 2) {
                this.checked = false;
                alert("Maksimal hanya boleh memilih 2 jadwal pelatihan.");
            }
        });
    });
}

// Tutup popup dan reset form
function closePopup() {
    const popup = document.getElementById('popupSuccess');
    const form = document.querySelector('.training-form');
    
    if (popup) {
        popup.style.display = 'none';
    }
    if (form) {
        form.reset();
    }
    window.location.href = "index.html";
}

// =============================================================================
// TESTIMONIAL SLIDER
// =============================================================================

function initializeTestimonialSlider() {
    const cards = document.querySelectorAll('.testimoni-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let current = 0;

    if (cards.length === 0) return;

    function showSlide(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
            if (dots[i]) {
                dots[i].classList.toggle('active', i === index);
            }
        });
        current = index;
    }

    if (prevBtn) {
        prevBtn.onclick = () => {
            showSlide((current - 1 + cards.length) % cards.length);
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            showSlide((current + 1) % cards.length);
        };
    }

    dots.forEach(dot => {
        dot.onclick = () => showSlide(parseInt(dot.dataset.index));
    });

    showSlide(current);
}

// =============================================================================
// REGISTRATION BUTTON
// =============================================================================

function initializeRegistrationButton() {
    const daftarBtn = document.querySelector('.btn-daftar');
    if (daftarBtn) {
        daftarBtn.addEventListener('click', function(e) {
            // Check if user is logged in
            const isLoggedIn = sessionStorage.getItem("loggedIn");

            if (!isLoggedIn) {
                e.preventDefault();
                alert("Silakan login terlebih dahulu sebelum mendaftar pelatihan.");
                window.location.href = "pages/login.html";
            } else {
                e.preventDefault();
                window.location.href = "pages/course-form.html";
            }
        });
    }
}

// =============================================================================
// FORM REDIRECTS
// =============================================================================

function redirectToHome(event) {
    if (event) {
        event.preventDefault();
    }
    window.location.href = "index.html";
}

function redirectToLogin(event) {
    if (event) {
        event.preventDefault();
    }
    window.location.href = "pages/login.html";
}

// =============================================================================
// PROGRAM SLIDER
// =============================================================================

function initializeProgramSlider() {
    let currentSlide = 0;
    const totalSlides = 6;
    const container = document.getElementById('programsContainer');

    if (!container) return;

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -slideIndex * 100;
        container.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }

    // Auto-slide functionality
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 4000);
}

// =============================================================================
// SMOOTH SCROLLING
// =============================================================================

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =============================================================================
// HOVER EFFECTS
// =============================================================================

function initializeHoverEffects() {
    // Course card hover effects
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });

    // Testimoni card hover effects
    document.querySelectorAll('.testimoni-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeFormInputs();
    initializeSearch();
    initializeProfile();
    initializeCheckboxLimitations();
    initializeTestimonialSlider();
    initializeRegistrationButton();
    initializeProgramSlider();
    initializeSmoothScrolling();
    initializeHoverEffects();
});

// Make functions globally available
window.validateForm = validateForm;
window.closePopup = closePopup;
window.redirectToHome = redirectToHome;
window.redirectToLogin = redirectToLogin;
