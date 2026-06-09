Install Dependencies
Use pip to install everything listed in requirements.tx
pip install -r requirements.txt

Run the Backend Serve
Start the Uvicorn web server, which will automatically discover all the routers (auth, property, etc.
uvicorn main:app --reload