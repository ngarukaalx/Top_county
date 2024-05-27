#!/usr/bin/env python3
"""flask app to server front end"""
from flask import Flask, render_template, jsonify
import uuid


app = Flask(__name__)
app.debug = True
cache_id = str(uuid.uuid4())

@app.route('/live', strict_slashes=False)
def test():
    return jsonify({"status": "fine"})


if __name__ == "__main__":
    """Driver function"""
    app.run(host='0.0.0.0', port=5000)
