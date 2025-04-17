from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Connect to MongoDB Atlas
client = MongoClient("mongodb+srv://pulkitshrivastavabtech2023:eNlJhr8xRuuQYJDX@facialrecognitiondatabs.l70mvub.mongodb.net/?retryWrites=true&w=majority&appName=FacialRecognitionDatabse")
db = client["facerecognition"]
alerts_collection = db["alerts"]

@app.route('/api/movement', methods=['GET'])
def get_movement():
    try:
        alerts = list(alerts_collection.find())
        movement_data = []

        for alert in alerts:
            p_id = alert.get("p_id")
            path = alert.get("recognized_cameras", [])

            formatted_path = []
            for camera in path:
                formatted_path.append({
                    "cameraId": camera.get("camera_id"),
                    "timestamp": camera.get("timestamp")
                })

            # Sort by timestamp
            try:
                formatted_path.sort(
                    key=lambda x: datetime.strptime(x["timestamp"], "%Y-%m-%dT%H:%M:%S.%fZ")
                )
            except Exception as e:
                print(f"Timestamp parsing error: {e}")
                continue  # Skip if timestamp format is invalid

            movement_data.append({
                "personId": str(alert["_id"]),
                "personName": p_id,
                "path": formatted_path
            })

        return jsonify(movement_data)
    
    except Exception as e:
        import traceback
        traceback.print_exc()  # Logs full stack trace to terminal
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
