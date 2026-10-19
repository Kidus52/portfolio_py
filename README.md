<div align="center">

# 🚀 Kidus Tigistu — Full-Stack Developer Portfolio

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.3-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

<p align="center">
  A modern, high-performance developer portfolio built with <strong>Python (Flask)</strong>, <strong>vanilla JavaScript</strong>, and <strong>custom Glassmorphism CSS</strong>. Designed to showcase engineering projects, technical milestones, and provide a direct contact gateway.
</p>

[Explore Projects](#-featured-projects) • [Key Features](#-key-features) • [Quickstart](#-getting-started) • [Deployment](#-deployment) • [Connect](#-lets-connect)

</div>

---

## 🌟 Key Features

- **⚡ Fast & Lightweight Backend**: Powered by Flask with minimal overhead, secure route handling, and clean Jinja2 templating.
- **🎨 Glassmorphic & Cyber-Dark Aesthetic**: Custom CSS design system featuring deep navy backgrounds, glowing cyan/blue accents, backdrop filters, and fluid responsiveness across all screen sizes.
- **📂 Interactive Project Gallery**:
  - Live category filtering (All, Full-Stack, Web Apps).
  - Rich interactive details modal displaying architecture overviews, tech badges, and direct GitHub source code links.
- **✉️ Dual-Channel Contact Architecture**:
  - **SQLite Database Persistence**: Every incoming message is safely saved into `messages.db` with timestamps so no opportunity is ever lost.
  - **Automated SMTP Email Forwarding**: Optionally sends instant notification emails directly to your inbox when SMTP credentials are configured.
- **📬 Private Messages Inbox Dashboard (`/admin/messages`)**:
  - Secure, password-protected portal to review client inquiries stored in `messages.db`.
  - Real-time unread counter, live keyword search filter, mark read/unread, and deletion actions.
  - Direct 1-click email replies with pre-filled subject lines.
- **💻 Interactive Developer CLI Terminal (KidusOS)**:
  - Accessible via floating launcher or keyboard shortcuts (`Ctrl + K` or `~`).
  - Supports commands: `help`, `about`, `skills`, `projects`, `resume`, `contact`, `admin`, `whoami`, `clear`, and `sudo hire kidus` (recruitment authorization easter egg).
  - Terminal history navigation with <kbd>↑</kbd> / <kbd>↓</kbd> arrow keys.
- **✨ Polish & Micro-Interactions**:
  - Dynamic Typewriter effect in the hero header.
  - Top viewport reading scroll-progress bar.
  - Floating smooth "Back to Top" button with scroll detection.
  - Custom branded SVG favicon with neon monogram.
- **🔍 SEO & Open Graph Optimized**: Pre-configured meta tags, Twitter cards, and Open Graph previews for rich links when shared on LinkedIn, Telegram, and WhatsApp.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Backend** | Python 3, Flask 3.0.3, Jinja2, WSGI (Gunicorn) |
| **Frontend** | HTML5 Semantic Markup, Vanilla CSS3 (Custom Design System, Flexbox/Grid), ES6+ JavaScript |
| **Database** | SQLite3 (Persistent contact storage) |
| **Typography & Icons** | Outfit, Plus Jakarta Sans (Google Fonts), FontAwesome 6 |
| **Deployment Ready** | Procfile, Gunicorn, Environment-variable driven configuration |

---

## 📂 Project Structure

```text
portfolio_py/
├── static/
│   ├── css/
│   │   └── style.css            # Custom styling, dark mode tokens & glassmorphism
│   ├── img/
│   │   ├── favicon.svg          # Branded developer SVG favicon
│   │   ├── profile.jpg          # Profile photo
│   │   └── background.jpg       # Ambient background texture
│   ├── js/
│   │   └── main.js              # Typewriter, filtering, modals & scroll handlers
│   ├── kidusresume.pdf          # Full developer resume / CV (PDF)
│   └── resume.pdf               # Resume fallback link
├── templates/
│   ├── 404.html                 # Custom branded 404 error page
│   ├── about.html               # Biography, timeline milestones & tech skills breakdown
│   ├── base.html                # Master layout with SEO, nav, footer & progress bar
│   ├── contact.html             # Contact channels & interactive inquiry form
│   ├── home.html                # Hero section, journey overview & featured preview
│   └── projects.html            # Filterable project gallery with detail modals
├── .env.example                 # Environment variables template
├── .gitignore                   # Ignored files (virtualenvs, databases, secrets)
├── Procfile                     # Web process command for Render/Railway
├── requirements.txt             # Production Python dependencies
├── web.py                       # Main Flask application, routes & database logic
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10 or higher installed on your machine.
- Git.

### Local Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kidus52/portfolio_py.git
   cd portfolio_py
   ```

2. **Create and activate a virtual environment**:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables (Optional)**:
   Copy `.env.example` to `.env` (or set them in your environment):
   ```bash
   cp .env.example .env
   ```

5. **Run the development server**:
   ```bash
   python web.py
   ```
   Open your browser and navigate to **`http://127.0.0.1:5000/`**.

---

## ⚙️ Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `SECRET_KEY` | Dev fallback | Flask session & flash message encryption |
| `ADMIN_PASSWORD` | `kidus2026` | Passcode for `/admin/messages` inbox dashboard |
| `FLASK_DEBUG` | `True` | Enables hot-reload during local development |
| `MAIL_SERVER` | `smtp.gmail.com` | SMTP host for forwarding contact inquiries |
| `MAIL_PORT` | `587` | TLS port for SMTP server |
| `MAIL_USERNAME`| *None* | Sender email address (e.g., your Gmail) |
| `MAIL_PASSWORD`| *None* | Google App Password (not your plain account password) |
| `MAIL_RECIPIENT` | `kidustigistu3410@gmail.com` | Email address where messages are delivered |

---

## 🚢 Deployment

This application is ready to deploy on **Render**, **Railway**, or **PythonAnywhere**:

### Deploying to Render / Railway:
1. Push your repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
3. Connect your repository.
4. Set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn web:web`
5. Add your environment variables (`SECRET_KEY`, `MAIL_USERNAME`, etc.) in the dashboard settings.

---

## 📬 Let's Connect

- **Author**: Kidus Tigistu
- **University**: Senior CS Student at Hilcoe School of Computer Science & Technology
- **GitHub**: [@Kidus52](https://github.com/Kidus52)
- **LinkedIn**: [Kidus Tigistu](https://www.linkedin.com/in/kidus-tigistu)
- **Telegram**: [@THEYCALLMESAINTLMAO](https://t.me/THEYCALLMESAINTLMAO)
- **Email**: [kidustigistu3410@gmail.com](mailto:kidustigistu3410@gmail.com)

---

<div align="center">
  <sub>Crafted with passion, logic, and clean code © 2026 Kidus Tigistu.</sub>
</div>
