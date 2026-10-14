import os
import sqlite3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, render_template, request, flash, redirect, url_for

web = Flask(__name__)
# Load secure secret key from environment variable in production, fallback to dev key locally
web.secret_key = os.environ.get('SECRET_KEY', 'kidus_portfolio_secret_key_2025_dev')

# Initialize SQLite database for contact messages
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'messages.db')

def init_db():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    subject TEXT,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()
    except Exception as e:
        print(f"Error initializing database: {e}")

init_db()

def save_contact_message(name, email, subject, message):
    """Persist client inquiries to SQLite database so no message is lost."""
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
                (name, email, subject, message)
            )
            conn.commit()
            return True
    except Exception as e:
        print(f"Error saving message to database: {e}")
        return False

def forward_email_notification(name, email, subject, message):
    """Optionally send email notification if SMTP environment variables are configured."""
    mail_user = os.environ.get('MAIL_USERNAME')
    mail_pass = os.environ.get('MAIL_PASSWORD')
    mail_server = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    mail_port = int(os.environ.get('MAIL_PORT', 587))
    recipient = os.environ.get('MAIL_RECIPIENT', 'kidustigistu3410@gmail.com')

    if not mail_user or not mail_pass:
        # SMTP not configured; messages are safely stored in DB
        return False

    try:
        msg = MIMEMultipart()
        msg['From'] = mail_user
        msg['To'] = recipient
        msg['Reply-To'] = email
        msg['Subject'] = f"Portfolio Inquiry: {subject or 'New Contact Message'} from {name}"

        body = f"""You received a new message from your portfolio website:

Name: {name}
Email: {email}
Subject: {subject or 'N/A'}

Message:
{message}
"""
        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(mail_server, mail_port)
        server.starttls()
        server.login(mail_user, mail_pass)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email notification: {e}")
        return False

# Data repository for projects
PROJECTS = [
    {
        'id': 1,
        'title': 'Web-Based Banking System',
        'category': 'fullstack',
        'short_desc': 'A secure full-stack banking application with real-time transaction processing and user account dashboards.',
        'full_desc': 'Built with Python (Flask) and MySQL database. Features robust authentication, password encryption, fund transfer management, transaction history logs, and administrative controls.',
        'image': 'img/project1.jpg',
        'tech': ['Python', 'Flask', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
        'github': 'https://github.com/Kidus52/Web-Based-Banking-System',
        'demo': '#'
    },
    {
        'id': 2,
        'title': 'Class Scheduler Application',
        'category': 'web',
        'short_desc': 'A web application that helps students and educators organize and optimize class timetables.',
        'full_desc': 'Developed using Python, JavaScript, and CSS. Resolves schedule conflicts, manages classroom allocations, and provides responsive schedule views for students.',
        'image': 'img/project2.jpg',
        'tech': ['Python', 'JavaScript', 'HTML5', 'CSS3', 'SQLite'],
        'github': 'https://github.com/Kidus52/Class-Scheduler',
        'demo': '#'
    },
    {
        'id': 3,
        'title': 'Online Flight Scheduler',
        'category': 'fullstack',
        'short_desc': 'A flight booking and scheduling system with real-time flight lookups and seat reservations.',
        'full_desc': 'Features dynamic flight search, seat selection, booking history, and admin schedule management using Flask, SQLite, and asynchronous JavaScript.',
        'image': 'img/project3.jpg',
        'tech': ['Python', 'Flask', 'SQLite', 'JavaScript', 'Bootstrap'],
        'github': 'https://github.com/Kidus52/Online-Flight-Scheduler',
        'demo': '#'
    }
]

SKILLS = {
    'Languages & Backend': [
        {'name': 'Python', 'icon': 'fa-brands fa-python', 'level': 'Advanced'},
        {'name': 'Flask', 'icon': 'fa-solid fa-flask', 'level': 'Advanced'},
        {'name': 'Java', 'icon': 'fa-brands fa-java', 'level': 'Intermediate'},
        {'name': 'C++ / C#', 'icon': 'fa-solid fa-code', 'level': 'Intermediate'}
    ],
    'Frontend': [
        {'name': 'HTML5 & CSS3', 'icon': 'fa-brands fa-html5', 'level': 'Advanced'},
        {'name': 'JavaScript (ES6+)', 'icon': 'fa-brands fa-js', 'level': 'Intermediate'},
        {'name': 'Responsive Design', 'icon': 'fa-solid fa-mobile-screen', 'level': 'Advanced'}
    ],
    'Databases & Tools': [
        {'name': 'MySQL', 'icon': 'fa-solid fa-database', 'level': 'Intermediate'},
        {'name': 'SQLite', 'icon': 'fa-solid fa-server', 'level': 'Intermediate'},
        {'name': 'Git & GitHub', 'icon': 'fa-brands fa-github', 'level': 'Advanced'}
    ]
}

@web.route('/', strict_slashes=False)
def home():
    return render_template("home.html", page='home', projects=PROJECTS[:2], skills=SKILLS)

@web.route('/about', strict_slashes=False)
def about():
    return render_template("about.html", page='about', skills=SKILLS)

@web.route('/projects', strict_slashes=False)
def projects():
    return render_template('projects.html', page='projects', projects=PROJECTS)

@web.route('/contact', methods=['GET', 'POST'], strict_slashes=False)
def contact():
    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()

        if not name or not email or not message:
            flash('Please fill in all required fields.', 'danger')
        else:
            # 1. Save to SQLite database so no inquiry is lost
            save_contact_message(name, email, subject, message)
            
            # 2. Forward to email if SMTP credentials are provided
            forward_email_notification(name, email, subject, message)

            flash(f'Thank you, {name}! Your message has been received. I will get back to you soon.', 'success')
            return redirect(url_for('contact'))

    return render_template('contact.html', page='contact')

@web.errorhandler(404)
def not_found(e):
    return render_template('404.html', page='404'), 404

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', 'True').lower() in ('true', '1', 't')
    web.run(debug=debug_mode)