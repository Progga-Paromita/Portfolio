document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const closeBtn = document.querySelector('.close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');


    menuToggle.addEventListener('click', () => {
        mobileNavMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        mobileNavMenu.classList.remove('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavMenu.classList.remove('active'); // Close menu on link click
        });
    });

    // --- Smooth Scrolling for all internal links ---
    document.querySelectorAll('a.smooth-scroll, .nav-link, .logo a, .mobile-nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's an internal hash link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dynamic Role Typing Effect ---
    const roleTypingTextElement = document.getElementById('role-typing-text');
    const roles = [
        "Flutter App developerer",
        //"Computer Vision and Deep learning developer",
        //"Python and TensorFlow enthusiast",
        "Builder of Real Time  applications",
        "Data driven problem solver",
        //"NLP-powered Web app creator"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Speed of typing characters
    let deletingSpeed = 50; // Speed of deleting characters
    let pauseAfterType = 1500; // Pause after typing a role
    let pauseAfterDelete = 500; // Pause after deleting a role

    function typeRoles() {
        const currentRole = roles[roleIndex];
        const cursorElement = document.querySelector('.cursor');

        if (isDeleting) {
            // Deleting text
            currentRoleText = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length; // Move to next role
                charIndex = 0;
                setTimeout(typeRoles, pauseAfterDelete); // Pause before typing next
            } else {
                setTimeout(typeRoles, deletingSpeed);
            }
        } else {
            // Typing text
            currentRoleText = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex > currentRole.length) {
                isDeleting = true;
                if (cursorElement) cursorElement.style.animation = 'blink 0.75s step-end infinite'; // Resume blinking
                setTimeout(typeRoles, pauseAfterType); // Pause after typing
            } else {
                setTimeout(typeRoles, typingSpeed);
            }
        }

        roleTypingTextElement.textContent = currentRoleText;
        if (cursorElement) {
             // Stop cursor blinking while typing/deleting, restart on pause
            if (charIndex === 0 && !isDeleting || charIndex === currentRole.length && !isDeleting) {
                 cursorElement.style.animation = 'blink 0.75s step-end infinite';
            } else {
                 cursorElement.style.animation = 'none';
                 cursorElement.style.borderRightColor = 'transparent';
            }
        }
    }

    // Start typing effect when the page loads
    if (roleTypingTextElement) {
        typeRoles();
    }

    // --- Active Navigation Link Logic ---
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');
    // mobileNavLinks is already defined at the top

    function setActiveLink() {
        let currentActiveSectionId = 'home'; // Default to home

        // Determine current active section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for header height
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActiveSectionId = section.id;
            }
        });

        // Update desktop navigation links
        desktopNavLinks.forEach(link => {
            if (link.dataset.section === currentActiveSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update mobile navigation links
        mobileNavLinks.forEach(link => {
            if (link.dataset.section === currentActiveSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Call on load and on scroll
    setActiveLink(); // Set initial active link
    window.addEventListener('scroll', setActiveLink);
});