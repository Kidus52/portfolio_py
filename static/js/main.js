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

    document.querySelectorAll('.project-card, .info-card, .skill-category-card, .timeline-item, .value-card, .contact-form-container, .info-item-card, .cert-card').forEach(el => {
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

    // 4.5 Tech Stack Keyword Search (Option C)
    const techSearchInput = document.getElementById('techSearchInput');
    const techSearchClear = document.getElementById('techSearchClear');
    const searchChips = document.querySelectorAll('.search-chip');
    const noResults = document.getElementById('searchNoResults');
    const noResultsTerm = document.getElementById('searchNoResultsTerm');
    const allProjectCards = document.querySelectorAll('.projects-gallery .project-card');

    function runTechSearch(keyword) {
        const term = keyword.trim().toLowerCase();

        // Toggle clear button visibility
        if (techSearchClear) techSearchClear.classList.toggle('visible', term.length > 0);

        // Highlight active chip (if any matches)
        searchChips.forEach(chip => {
            chip.classList.toggle('active', chip.getAttribute('data-keyword').toLowerCase() === term);
        });

        let visibleCount = 0;
        allProjectCards.forEach(card => {
            // Build searchable text from title, description, and all tech tags
            const titleText = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const descText = card.querySelector('p')?.textContent.toLowerCase() || '';
            const techTagsText = Array.from(card.querySelectorAll('.tech-tag'))
                .map(t => t.textContent.toLowerCase()).join(' ');
            const fullText = `${titleText} ${descText} ${techTagsText}`;

            const match = !term || fullText.includes(term);

            if (match) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 30);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.92)';
                setTimeout(() => { card.style.display = 'none'; }, 250);
            }
        });

        // Show/hide no-results state
        if (noResults) {
            if (term && visibleCount === 0) {
                noResults.style.display = 'block';
                if (noResultsTerm) noResultsTerm.textContent = `"${keyword.trim()}"`;
            } else {
                noResults.style.display = 'none';
            }
        }
    }

    if (techSearchInput) {
        // Live input listener — debounced 120ms
        let searchDebounce;
        techSearchInput.addEventListener('input', () => {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => runTechSearch(techSearchInput.value), 120);
        });

        // Clear button
        if (techSearchClear) {
            techSearchClear.addEventListener('click', () => {
                techSearchInput.value = '';
                techSearchInput.focus();
                runTechSearch('');
            });
        }

        // Quick-pick chips
        searchChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const kw = chip.getAttribute('data-keyword');
                // Toggle: clicking an already-active chip clears the search
                if (chip.classList.contains('active')) {
                    techSearchInput.value = '';
                    runTechSearch('');
                } else {
                    techSearchInput.value = kw;
                    runTechSearch(kw);
                }
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

    // 6.5 Certificate Lightbox (Certifications section on About page)
    const certLightbox = document.getElementById('certLightbox');
    const certLightboxImg = document.getElementById('certLightboxImg');
    const certLightboxTitleBar = document.getElementById('certLightboxTitleBar');
    const certLightboxClose = document.getElementById('certLightboxClose');
    const certLightboxBackdrop = document.getElementById('certLightboxBackdrop');

    function openCertLightbox(src, title) {
        if (!certLightbox) return;
        certLightboxImg.src = src;
        certLightboxImg.alt = title;
        if (certLightboxTitleBar) certLightboxTitleBar.textContent = title;
        certLightbox.classList.add('open');
        certLightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCertLightbox() {
        if (!certLightbox) return;
        certLightbox.classList.remove('open');
        certLightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.cert-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.getAttribute('data-cert-src');
            const title = btn.getAttribute('data-cert-title');
            openCertLightbox(src, title);
        });
    });

    if (certLightboxClose) certLightboxClose.addEventListener('click', closeCertLightbox);
    if (certLightboxBackdrop) certLightboxBackdrop.addEventListener('click', closeCertLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCertLightbox();
    });

    // 6.6 Color Accent & Theme Switcher (Option 5)

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptBtns = document.querySelectorAll('.theme-opt-btn');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio_theme', theme);
        themeOptBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme-name') === theme);
        });
    }

    const currentTheme = localStorage.getItem('portfolio_theme') || 'cyan';
    applyTheme(currentTheme);

    if (themeToggleBtn && themeDropdown) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = themeDropdown.classList.contains('open');
            if (isOpen) {
                themeDropdown.classList.remove('open');
                themeDropdown.setAttribute('aria-hidden', 'true');
            } else {
                themeDropdown.classList.add('open');
                themeDropdown.setAttribute('aria-hidden', 'false');
            }
        });

        document.addEventListener('click', (e) => {
            if (!themeDropdown.contains(e.target) && e.target !== themeToggleBtn) {
                themeDropdown.classList.remove('open');
                themeDropdown.setAttribute('aria-hidden', 'true');
            }
        });

        themeOptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selected = btn.getAttribute('data-theme-name');
                applyTheme(selected);
                themeDropdown.classList.remove('open');
                themeDropdown.setAttribute('aria-hidden', 'true');
            });
        });
    }

    // 6.6 Copy Email to Clipboard (Option A) - Glassmorphic Toast
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const clipboardToast = document.getElementById('clipboardToast');

    if (copyEmailBtn && clipboardToast) {
        let toastTimeout;
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('kidustigistu3410@gmail.com').then(() => {
                // Show toast
                clipboardToast.classList.add('show');
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    clipboardToast.classList.remove('show');
                }, 2800);
                // Flash the icon to a checkmark briefly
                const icon = copyEmailBtn.querySelector('i');
                icon.className = 'fa-solid fa-circle-check';
                setTimeout(() => { icon.className = 'fa-solid fa-envelope'; }, 2000);
            }).catch(() => {
                // Fallback: open mailto if clipboard not available (e.g. http context)
                window.location.href = 'mailto:kidustigistu3410@gmail.com';
            });
        });
    }

    // 6.7 Animated Stats Counter (Option D)
    const statNumbers = document.querySelectorAll('.stat-item[data-target] .stat-number');

    function animateCount(el, target, duration) {
        let start = 0;
        const step = Math.ceil(target / (duration / 40));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                start = target;
                clearInterval(timer);
                el.classList.add('counted');
            }
            el.textContent = start;
        }, 40);
    }

    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.closest('.stat-item').getAttribute('data-target'), 10);
                    animateCount(el, target, 900);
                    statsObserver.unobserve(el);
                }
            });
        }, { threshold: 0.6 });

        statNumbers.forEach(el => statsObserver.observe(el));
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
  <div class="term-table-cmd">theme [name]</div><div class="term-table-desc">Switch color accent (cyan, emerald, purple, crimson)</div>
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
  <div><strong>1. Client-Server Banking System</strong> <span class="term-purple">[Full-Stack]</span></div>
  <div class="term-muted">Multi-tier banking application with socket networking, role-based controls & SQL database.</div>
  <div>Tech: C#, .NET, SQL Server, Sockets | <a href="https://github.com/Kidus52/Banking-System" target="_blank" class="term-link">GitHub Repository ↗</a></div>
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

                case 'theme':
                    const curTheme = localStorage.getItem('portfolio_theme') || 'cyan';
                    printLine(`
<div class="term-cyan">🎨 KidusOS Theme Manager:</div>
<div>Active Accent Glow: <span class="term-yellow">${curTheme.toUpperCase()}</span></div>
<div style="margin: 0.35rem 0;">Available Palettes:</div>
<div>  • <span class="term-cyan">cyan</span> — Cyan Glow (Default)</div>
<div>  • <span class="term-green">emerald</span> — Emerald Matrix</div>
<div>  • <span class="term-purple">purple</span> — Purple Synthwave</div>
<div>  • <span style="color: #f43f5e;">crimson</span> — Crimson Red</div>
<div class="term-muted" style="margin-top: 0.35rem;">Usage: <span class="term-yellow">theme &lt;name&gt;</span> (e.g. <code>theme emerald</code>)</div>
                    `);
                    break;

                case 'theme cyan':
                case 'theme emerald':
                case 'theme purple':
                case 'theme crimson':
                case 'theme matrix':
                case 'theme synth':
                case 'theme synthwave':
                case 'theme red':
                    const rawThemeArg = lower.replace('theme ', '').trim();
                    const themeAliases = {
                        'cyan': 'cyan',
                        'emerald': 'emerald',
                        'matrix': 'emerald',
                        'purple': 'purple',
                        'synth': 'purple',
                        'synthwave': 'purple',
                        'crimson': 'crimson',
                        'red': 'crimson'
                    };
                    const targetTheme = themeAliases[rawThemeArg] || rawThemeArg;
                    applyTheme(targetTheme);
                    printLine(`
<div class="term-green">✓ Accent glow successfully switched to [${targetTheme.toUpperCase()}]!</div>
<div class="term-muted">Preference synchronized with navbar palette and saved to browser localStorage.</div>
                    `);
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
                    if (lower.startsWith('theme ')) {
                        const badTheme = escapeHtml(input.substring(6).trim());
                        printLine(`
<div style="color: #ef4444;">Unknown theme palette: '${badTheme}'. Valid options: <span class="term-cyan">cyan</span>, <span class="term-green">emerald</span>, <span class="term-purple">purple</span>, <span style="color:#f43f5e;">crimson</span>.</div>
                        `);
                        break;
                    }
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