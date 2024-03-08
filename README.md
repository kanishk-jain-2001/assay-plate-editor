# assay-plate-editor
Creating an Interactive Assay Plate Editor and Viewer Application 

## Backend 
The backend will have a few endpoints that the frontend and other companies can interact with. The Backend uses PostGreSQL for holding the information about the plate configuration. 

### PostgreSQL 
In the models.py folder, you can see the three tables that are used in this. 

### Delete Assay Plate Endpoint 
This will allow the user to delete an endpoint 

### Test cases using cURL 
Here are a few test cases to run easily using cURL if you are running the backend locally: 

Test Case 1: Add a New 96-Well Plate

curl -X POST http://127.0.0.1:5000/add_or_update_plate \
     -H 'Content-Type: application/json' \
     -d '{"type": "96", "wells": {"A1": "Sample1", "A2": "Sample2"}}'

Test Case 2: Add a New 384-Well Plate

curl -X POST http://127.0.0.1:5000/add_or_update_plate \
     -H 'Content-Type: application/json' \
     -d '{"type": "384", "wells": {"B1": "Sample3", "B2": "Sample4"}}'

Test Case 3: Update an Existing 96-Well Plate

curl -X POST http://127.0.0.1:5000/add_or_update_plate \
     -H 'Content-Type: application/json' \
     -d '{"id": 1, "wells": {"A1": "NewSample1", "A2": "NewSample2"}}'

Test Case 4: Update an Existing 384-Well Plate

curl -X POST http://127.0.0.1:5000/add_or_update_plate \
     -H 'Content-Type: application/json' \
     -d '{"id": 2, "wells": {"B1": "NewSample3", "B2": "NewSample4"}}'


### 

## Frontend 
The frontend is based off of React and uses react-bootstrap for styling 

### 

