from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    app.run()

# This will be a flask app that includes all of the endpoints for the project:

# We will also have to connect to a database, so lets use postgresql. 