from flask import Flask, render_template, request, flash, redirect, url_for

web = Flask(__name__)
web.secret_key = 'kidus_portfolio_secret_key_2025'

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
        'github': 'https://github.com/Kidus52',
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
        'github': 'https://github.com/Kidus52',
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
        'github': 'https://github.com/Kidus52',
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
            flash(f'Thank you, {name}! Your message has been received. I will get back to you soon.', 'success')
            return redirect(url_for('contact'))

    return render_template('contact.html', page='contact')

@web.errorhandler(404)
def not_found(e):
    return render_template('404.html', page='404'), 404

if __name__ == '__main__':
    web.run(debug=True)