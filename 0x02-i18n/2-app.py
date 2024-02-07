#!/usr/bin/env python3
"""get locale from request"""
from flask_babel import Babel
from flask import Flask, render_template, request


app = Flask(__name__)
babel = Babel(app)


class Config:
    """localization configuration"""
    LANGUAGES = ['en', 'fr']


app.config.from_object(Config)
babel.default_locale = 'en'
babel.default_timezone = 'UTC'


@babel.localeselector
def get_locale():
    """get localization"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', strict_slashes=False)
def index():
    """render html template"""
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run()
