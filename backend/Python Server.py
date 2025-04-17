from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Atlas Connection
client = MongoClient("mongodb+srv://pulkitshrivastavabtech2023: eNlJhr8xRuuQYJDX  @facialrecognitiondatabs.l70mvub.mongodb.net/?retryWrites=true&w=majority&appName=FacialRecognitionDatabse")
db = client["facerecognition"]
alerts_collection = db["alerts"]

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    try:
        pipeline = [
            {
                "$group": {
                    "_id": "$personId",
                    "personName": {"$first": "$personName"},
                    "path": {
                        "$push": {
                            "cameraId": "$cameraId",
                            "timestamp": "$timestamp"
                        }
                    }
                }
            }
        ]
        alerts_data = list(alerts_collection.aggregate(pipeline))
        for entry in alerts_data:
            entry["personId"] = entry.pop("_id")
            entry["path"].sort(key=lambda x: datetime.strptime(x["timestamp"], "%Y-%m-%dT%H:%M:%S"))
        return jsonify(alerts_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
