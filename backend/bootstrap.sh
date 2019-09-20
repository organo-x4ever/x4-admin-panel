#!/bin/bash
export FLASK_APP=./app.py
# export FLASK_APP=./src/main.py
# source $(python --venv)/bin/activate
# FLASK_ENV=development
# optional debug mode
export FLASK_DEBUG=1
flask run -h 127.0.0.1