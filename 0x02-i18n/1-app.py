#!/usr/bin/env python3
"""a module for basic babel setup"""
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config:
    """a config class with language attribute"""
    LANGUAGES = ['en', 'fr']



app.config.from_object(Config)
babel.default_locale = 'en'
babel.default_timezone = 'UTC'
