from flask import Flask
import models 

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] =  "postgresql://postgres:password@127.0.0.1:5432/bio-assay-app"

models.db.init_app(app)

with app.app_context():
    models.db.create_all()

@app.route("/view-assay-plates")
def view_plates():

    """
    Returns a list of all configured plates in the database 
    """

    return "<p>Hello, World!</p>"

@app.route("/delete-assay-plate")
def delete_plate():

    """
    Deletes a specific plate from the database. 
    """

    return "<p>Hello, World!</p>"

@app.route("/create-assay-plate")
def create_plate():

    """
    Creates an Assay Plate 
    """

    return "<p>Hello, World!</p>"

@app.route("/update-or-add-assay-plate-info")
def update_add_plate_info():

    """
    Allows the user to update or add an assay plate of their choosing 
    """

    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.run()

