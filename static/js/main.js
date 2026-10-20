document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 2. Typewriter Effect for Hero Section
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const phrases = [
            'Full-Stack Web Developer',
            'Python & Flask Specialist',
            'Senior CS Student @ Hilcoe'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end of phrase
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // 3. Scroll Reveal Animation using IntersectionObserver
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .info-card, .skill-category-card, .timeline-item, .value-card, .contact-form-container, .info-item-card').forEach(el => {
        el.classList.add('reveal-on-scroll');
        scrollObserver.observe(el);
    });

    // 4. Project Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-gallery .project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 5. Project Details Modal Logic
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');

    if (modal) {
        document.querySelectorAll('.open-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const title = btn.getAttribute('data-title');
                const category = btn.getAttribute('data-category');
                const desc = btn.getAttribute('data-desc');
                const techList = btn.getAttribute('data-tech').split(', ');
                const github = btn.getAttribute('data-github');
                const image = btn.getAttribute('data-image');
                const status = btn.getAttribute('data-status');

                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalCategory').textContent = category;
                document.getElementById('modalDesc').textContent = desc;
                document.getElementById('modalGithub').setAttribute('href', github);

                const modalImg = document.getElementById('modalMockupImg');
                if (modalImg && image) {
                    modalImg.setAttribute('src', image);
                    modalImg.setAttribute('alt', `${title} Architecture Preview`);
                }

                const modalStatus = document.getElementById('modalStatusBadge');
                if (modalStatus) {
                    if (status) {
                        modalStatus.textContent = status;
                        modalStatus.style.display = 'inline-flex';
                    } else {
                        modalStatus.style.display = 'none';
                    }
                }

                const techContainer = document.getElementById('modalTechTags');
                techContainer.innerHTML = '';
                techList.forEach(tech => {
                    const tag = document.createElement('span');
                    tag.className = 'tech-tag';
                    tag.textContent = tech;
                    techContainer.appendChild(tag);
                });

                modal.classList.add('modal-show');
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('modal-show');
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('modal-show');
            }
        });
    }

    // 6. Scroll Progress Bar & Back to Top Floating Button
    const progressBar = document.getElementById('scrollProgressBar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Update reading progress bar
        if (progressBar && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }

        // Toggle back to top button visibility (appear after 300px)
        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Interactive Developer Terminal (KidusOS CLI)
    const terminalLauncher = document.getElementById('terminalLauncher');
    const terminalModal = document.getElementById('terminalModal');
    const terminalBackdrop = document.getElementById('terminalBackdrop');
    const terminalCloseBtn = document.getElementById('terminalCloseBtn');
    const terminalMinBtn = document.getElementById('terminalMinBtn');
    const terminalMaxBtn = document.getElementById('terminalMaxBtn');
    const terminalWindow = document.querySelector('.terminal-window');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');

    if (terminalModal && terminalInput && terminalOutput) {
        let isInitialized = false;
        const commandHistory = [];
        let historyIndex = -1;

        const welcomeBanner = `
  _  ___     _             ____   ____  
 | |/ (_) __| |_   _ ___  / __ \\ / ___| 
 | ' /| |/ _\` | | | / __|/ / _\` |\\___ \\ 
 | . \\| | (_| | |_| \\__ \\ | (_| | ___) |
 |_|\\_\\_|\\__,_|\\__,_|___/ \\ \\__,_||____/ 
                           \\____/       
 Kidus Tigistu — Full-Stack Developer CLI [v1.0.0]
 Type <span class="term-yellow">'help'</span> to see available commands or <span class="term-yellow">'exit'</span> to close.`;

        function openTerminal() {
            terminalModal.classList.add('open');
            terminalModal.setAttribute('aria-hidden', 'false');
            if (!isInitialized) {
                printLine(`<div class="term-banner">${welcomeBanner}</div>`);
                printLine(`<div class="term-muted">System ready. Logged in as guest@kidus-portfolio.</div>`);
                isInitialized = true;
            }
            setTimeout(() => {
                terminalInput.focus();
                scrollToBottom();
            }, 100);
        }

        function closeTerminal() {
            terminalModal.classList.remove('open');
            terminalModal.setAttribute('aria-hidden', 'true');
        }

        function toggleTerminal() {
            if (terminalModal.classList.contains('open')) {
                closeTerminal();
            } else {
                openTerminal();
            }
        }

        function scrollToBottom() {
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }

        function printLine(html) {
            const line = document.createElement('div');
            line.className = 'term-line';
            line.innerHTML = html;
            terminalOutput.appendChild(line);
            scrollToBottom();
        }

        // Open/Close triggers
        if (terminalLauncher) {
            terminalLauncher.addEventListener('click', toggleTerminal);
        }
        if (terminalBackdrop) {
            terminalBackdrop.addEventListener('click', closeTerminal);
        }
        if (terminalCloseBtn) {
            terminalCloseBtn.addEventListener('click', closeTerminal);
        }
        if (terminalMinBtn) {
            terminalMinBtn.addEventListener('click', closeTerminal);
        }
        if (terminalMaxBtn && terminalWindow) {
            terminalMaxBtn.addEventListener('click', () => {
                terminalWindow.classList.toggle('maximized');
            });
        }

        // Click anywhere in terminal body to focus input
        if (terminalBody) {
            terminalBody.addEventListener('click', () => {
                terminalInput.focus();
            });
        }

        // Global keyboard shortcut listeners (Ctrl+K or ` or ~)
        window.addEventListener('keydown', (e) => {
            const isCtrlK = (e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K');
            const isTilde = (e.key === '`' || e.key === '~') && 
                            document.activeElement.tagName !== 'INPUT' && 
                            document.activeElement.tagName !== 'TEXTAREA';

            if (isCtrlK || isTilde) {
                e.preventDefault();
                toggleTerminal();
            } else if (e.key === 'Escape' && terminalModal.classList.contains('open')) {
                closeTerminal();
            }
        });

        // Command handler
        function executeCommand(rawInput) {
            const input = rawInput.trim();
            if (!input) return;

            // Echo input
            printLine(`
                <div class="term-cmd-row">
                    <span class="term-prompt">visitor@kidus:~$</span>
                    <span class="term-cmd">${escapeHtml(input)}</span>
                </div>
            `);

            // Save to history
            commandHistory.push(input);
            historyIndex = commandHistory.length;

            const lower = input.toLowerCase();

            switch (lower) {
                case 'help':
                    printLine(`
<div class="term-cyan">Available Commands:</div>
<div class="term-table">
  <div class="term-table-cmd">about / bio</div><div class="term-table-desc">Display developer summary & background</div>
  <div class="term-table-cmd">skills</div><div class="term-table-desc">View core technical competencies</div>
  <div class="term-table-cmd">projects</div><div class="term-table-desc">List featured full-stack software systems</div>
  <div class="term-table-cmd">resume / cv</div><div class="term-table-desc">Open & download Kidus's real PDF resume</div>
  <div class="term-table-cmd">contact</div><div class="term-table-desc">Show social links, email, and direct channels</div>
  <div class="term-table-cmd">sudo hire kidus</div><div class="term-table-desc">Unlock recruitment authorization easter egg</div>
  <div class="term-table-cmd">admin / inbox</div><div class="term-table-desc">Open private client messages inbox portal</div>
  <div class="term-table-cmd">whoami</div><div class="term-table-desc">Display current user session info</div>
  <div class="term-table-cmd">date</div><div class="term-table-desc">Show current server date and time</div>
  <div class="term-table-cmd">clear</div><div class="term-table-desc">Clear the terminal screen</div>
  <div class="term-table-cmd">exit</div><div class="term-table-desc">Close this terminal session</div>
</div>
<div class="term-muted">Tip: Use <kbd>Up</kbd> / <kbd>Down</kbd> arrow keys to navigate command history.</div>
                    `);
                    break;

                case 'admin':
                case 'inbox':
                    printLine(`
<div class="term-cyan">🔒 Admin Inbox Portal:</div>
<div>Redirecting to <a href="/admin/messages" class="term-link">/admin/messages</a>...</div>
                    `);
                    setTimeout(() => {
                        window.location.href = '/admin/messages';
                    }, 1000);
                    break;

                case 'about':
                case 'bio':
                    printLine(`
<div class="term-cyan">👤 Kidus Tigistu</div>
<div>Senior Computer Science Student at Hilcoe School of Computer Science & Technology.</div>
<div>Passionate full-stack developer specializing in clean web applications, secure backends, and elegant user experiences.</div>
<div>Whether building banking architectures, timetable schedulers, or flight booking engines, I focus on engineering reliable, production-ready solutions.</div>
                    `);
                    break;

                case 'skills':
                    printLine(`
<div class="term-cyan">🛠️ Technical Skills:</div>
<div><span class="term-yellow">Languages & Backend:</span> Python, Flask, Java, C++, C#, RESTful APIs</div>
<div><span class="term-yellow">Frontend:</span> HTML5, CSS3 (Glassmorphism, Flexbox, Grid), JavaScript (ES6+), Responsive UI</div>
<div><span class="term-yellow">Databases & Storage:</span> MySQL, SQLite, Data Modeling, Transaction Safety</div>
<div><span class="term-yellow">Tools & DevOps:</span> Git, GitHub, Linux, WSGI (Gunicorn), Virtual Environments</div>
                    `);
                    break;

                case 'projects':
                    printLine(`
<div class="term-cyan">📂 Featured Projects:</div>
<div style="margin: 0.3rem 0;">
  <div><strong>1. Web-Based Banking System</strong> <span class="term-purple">[Full-Stack]</span></div>
  <div class="term-muted">Secure banking system with real-time transaction processing, authentication & logs.</div>
  <div>Tech: Python, Flask, MySQL, JavaScript | <a href="https://github.com/Kidus52/Web-Based-Banking-System" target="_blank" class="term-link">GitHub Repository ↗</a></div>
</div>
<div style="margin: 0.3rem 0;">
  <div><strong>2. Class Scheduler Application</strong> <span class="term-purple">[Web App]</span></div>
  <div class="term-muted">Timetable optimizer resolving scheduling conflicts and classroom resource allocations.</div>
  <div>Tech: Python, JavaScript, CSS3, SQLite | <a href="https://github.com/Kidus52/Class-Scheduler" target="_blank" class="term-link">GitHub Repository ↗</a></div>
</div>
<div style="margin: 0.3rem 0;">
  <div><strong>3. Online Flight Scheduler</strong> <span class="term-purple">[Full-Stack]</span></div>
  <div class="term-muted">Flight lookup, seat reservations, and admin schedule management portal.</div>
  <div>Tech: Python, Flask, SQLite, Bootstrap | <a href="https://github.com/Kidus52/Online-Flight-Scheduler" target="_blank" class="term-link">GitHub Repository ↗</a></div>
</div>
                    `);
                    break;

                case 'resume':
                case 'cv':
                    printLine(`
<div class="term-green">📄 Accessing resume...</div>
<div>Opening <span class="term-cyan">kidusresume.pdf</span> in a new tab...</div>
                    `);
                    window.open('/static/kidusresume.pdf', '_blank');
                    break;

                case 'contact':
                case 'socials':
                    printLine(`
<div class="term-cyan">📬 Connect With Kidus:</div>
<div>📧 Email: <a href="mailto:kidustigistu3410@gmail.com" class="term-link">kidustigistu3410@gmail.com</a></div>
<div>💼 LinkedIn: <a href="https://www.linkedin.com/in/kidus-tigistu" target="_blank" class="term-link">linkedin.com/in/kidus-tigistu</a></div>
<div>🐙 GitHub: <a href="https://github.com/Kidus52" target="_blank" class="term-link">github.com/Kidus52</a></div>
<div>✈️ Telegram: <a href="https://t.me/THEYCALLMESAINTLMAO" target="_blank" class="term-link">@THEYCALLMESAINTLMAO</a></div>
<div>📸 Instagram: <a href="https://www.instagram.com/_____kidus_____" target="_blank" class="term-link">@_____kidus_____</a></div>
                    `);
                    break;

                case 'sudo hire kidus':
                case 'hire kidus':
                case 'hire':
                    printLine(`
<div class="term-green" style="font-size: 1.05rem; font-weight: bold;">
  🎉 [ACCESS GRANTED]: Exceptional Software Engineer Authenticated!
</div>
<div style="margin: 0.4rem 0;">
  Thank you for recognizing talent! Kidus is ready to build high-impact products for your team.
</div>
<div class="term-yellow">
  ⚡ Redirecting you to the contact form to start the conversation...
</div>
                    `);
                    setTimeout(() => {
                        window.location.href = '/contact';
                    }, 1800);
                    break;

                case 'whoami':
                    printLine(`<div class="term-green">guest_user</div><div class="term-muted">Role: Visionary looking to hire or collaborate with top engineering talent.</div>`);
                    break;

                case 'date':
                    printLine(`<div class="term-cyan">${new Date().toLocaleString()}</div>`);
                    break;

                case 'clear':
                case 'cls':
                    terminalOutput.innerHTML = '';
                    break;

                case 'exit':
                case 'quit':
                    closeTerminal();
                    break;

                default:
                    printLine(`
<div class="term-line"><span style="color: #ef4444;">Command not found:</span> '${escapeHtml(input)}'. Type <span class="term-yellow">'help'</span> for a list of available commands.</div>
                    `);
            }
        }

        function escapeHtml(str) {
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        // Input keydown listener
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const cmd = terminalInput.value;
                terminalInput.value = '';
                executeCommand(cmd);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length > 0 && historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                } else if (historyIndex === 0 && commandHistory.length > 0) {
                    terminalInput.value = commandHistory[0];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });
    }
});