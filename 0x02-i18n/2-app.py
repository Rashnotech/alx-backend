#!/usr/bin/env python3
"""get locale from request"""
from flask_babel import Babel
from flask import Flask, render_template, request


class Config:
    """localization configuration"""
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """get localization"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', strict_slashes=False)
def index() -> str:
    """render html template"""
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run()
