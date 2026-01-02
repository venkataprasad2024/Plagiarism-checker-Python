import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from plagiarism import compute_similarity

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend is running"

@app.route("/api/check-plagiarism", methods=["POST"])
def check_plagiarism():
    files = request.files.getlist("files")

    # Validate input
    if not files or len(files) < 2:
        return jsonify({"error": "Upload at least two files"}), 400

    file_paths = []

    for file in files:
        if file.filename == "":
            continue

        path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(path)
        file_paths.append(path)

    # Safety check
    if len(file_paths) < 2:
        return jsonify({"error": "Valid files not received"}), 400

    results = compute_similarity(file_paths)

    if not results:
        return jsonify({"error": "Could not extract text from uploaded files"}), 400

    return jsonify(results), 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
