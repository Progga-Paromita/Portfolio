document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Functionality ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

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

    // --- Contact Form Functionality ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Create mailto link as fallback
                const mailtoLink = `mailto:proggaparomitaarish@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form and button
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                showFormMessage('Message prepared! Your email client should open shortly.', 'success');
            }, 1000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form message function
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insert message after form
        const formContainer = document.querySelector('.contact-form-container');
        formContainer.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Fade-in animation for hero section on page load
    window.addEventListener('DOMContentLoaded', () => {
        const hero = document.querySelector('.hero-content.fade-in');
        if (hero) {
            hero.classList.add('fade-in');
        }
    });

    // Smooth theme toggle transition
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // Animate skill bars when in view
    document.addEventListener('DOMContentLoaded', function() {
        const bars = document.querySelectorAll('.bar-fill');
        bars.forEach(bar => {
            bar.style.width = '0';
        });
        function animateBars() {
            const section = document.querySelector('.skills-section');
            if (section && section.getBoundingClientRect().top < window.innerHeight - 100) {
                bars.forEach(bar => {
                    bar.style.width = bar.getAttribute('style').match(/width:\s*(\d+%)/)[1];
                });
                window.removeEventListener('scroll', animateBars);
            }
        }
        window.addEventListener('scroll', animateBars);
        animateBars();
    });

    // Add interactive hover effect for skill-category containers
    document.querySelectorAll('.skill-category').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
            card.style.boxShadow = '0 8px 32px rgba(60,60,120,0.13)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    const currentTheme = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
});