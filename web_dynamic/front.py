#!/usr/bin/env python3
"""flask app to server front end"""
from flask import Flask, render_template, jsonify
import uuid


app = Flask(__name__)
app.debug = True
cache_id = str(uuid.uuid4())

@app.route('/live', strict_slashes=False)
def test():
    """test server"""
    return jsonify({"status": "fine"})

@app.route('/home', strict_slashes=False)
def home():
    """serves the home page"""
    return render_template('homepage.html', cache_id=cache_id)


@app.route('/county', strict_slashes=False)
def county():
    """serves county"""
    return render_template('county.html', cache_id=cache_id)

@app.route('/subcounty', strict_slashes=False)
def sub():
    """serves subcounty"""
    return render_template('subcounty.html', cache_id=cache_id)

@app.route('/ward', strict_slashes=False)
def ward():
    """serves ward"""
    return render_template('ward.html', cache_id=cache_id)

@app.route('/user', strict_slashes=False)
def user():
    """servers user page"""
    return render_template('user_page.html', cache_id=cache_id)

@app.route('/register', strict_slashes=False)
def register():
    """serves register page"""
    return render_template('register.html', cache_id=cache_id)

if __name__ == "__main__":
    """Driver function"""
    app.run(host='0.0.0.0', port=5000)
