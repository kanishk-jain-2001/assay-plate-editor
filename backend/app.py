from flask import Flask, request, jsonify 
from flask_cors import CORS
from sqlalchemy import select
import models

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] =  "postgresql://postgres:password@127.0.0.1:5432/bio-assay-app"

models.db.init_app(app)

# with app.app_context():
#     models.db.create_all()

@app.route("/view-assay-plates", methods=['GET'])
def view_plates():
    # Fetch data from database with joined details
    plates_query = models.db.session.query(models.Plates).all()

    # Convert data into a serializable format
    plates_data = []
    for plate in plates_query:
        plate_dict = {column.name: getattr(plate, column.name) for column in plate.__table__.columns}
        # Add wells information if available
        if plate.type == 96:  # Assuming 'type' indicates the plate type
            plate_dict['wells'] = plate.plate96_details.wells if plate.plate96_details else None
        elif plate.type == 384:
            plate_dict['wells'] = plate.plate384_details.wells if plate.plate384_details else None
        plates_data.append(plate_dict)

    # Return data as a JSON response
    return jsonify(plates_data)


@app.route("/delete-assay-plate/<int:plate_id>", methods=['DELETE'])
def delete_plate(plate_id):
    """Deletes a specific plate from the database."""
    try:
        plate_to_delete = models.db.session.execute(models.db.select(models.Plates).filter_by(id=plate_id)).scalar_one()
        if plate_to_delete:
            models.db.session.delete(plate_to_delete)
            models.db.session.commit()
            return jsonify({'message': 'Plate deleted successfully'}), 200
        else:
            return jsonify({'message': 'Plate not found'}), 404
    except Exception as e:
        # Log the exception e
        models.db.session.rollback()
        print(f"Error: {e}")  # Log the exception for debugging
        return jsonify({'message': 'An error occurred during deletion'}), 500


@app.route("/update-or-add-assay-plate", methods=['POST'])
def update_add_plate_info():
    """ Allows the user to update or add either a 96 or a 384 well plate"""
    data = request.json
    plate_id = data.get('id')

    # Logic for updating assay plate information
    if plate_id: 
        plate = models.db.session.execute(models.db.select(models.Plates).filter_by(id=plate_id)).scalar_one()
        if not plate: 
            return jsonify({"error": "Plate not found"}), 404
        if plate.type == 96:
            # Prepare the statement to select the Plate96 object
            stmt = select(models.Plate96).where(models.Plate96.plate_id == plate_id)
            # Execute the statement and fetch the first result
            plate96 = models.db.session.scalars(stmt).first()
            # Check if the object exists and update
            if plate96:
                plate96.wells = data['wells']
        elif plate.type == 384:
            # Prepare the statement to select the Plate96 object
            stmt = select(models.Plate96).where(models.Plate96.plate_id == plate_id)
            # Execute the statement and fetch the first result
            plate394 = models.db.session.scalars(stmt).first()
            # Check if the object exists and update
            if plate394:
                plate394.wells = data['wells']
    
    # Logic for adding a new assay plate
    else: 
        new_plate = models.Plates(type=data['type'])
        models.db.session.add(new_plate)
        models.db.session.flush()
        if data['type'] == 96: 
            new_plate96 = models.Plate96(plate_id=new_plate.id, wells=data['wells'])
            models.db.session.add(new_plate96)
        elif data['type'] == 384: 
            new_plate384 = models.Plate384(plate_id=new_plate.id, wells=data['wells'])
            models.db.session.add(new_plate384)

    models.db.session.commit()
    return jsonify({"message":"Plate processed successfuly"}), 200

if __name__ == '__main__':
    app.run(debug=True)

