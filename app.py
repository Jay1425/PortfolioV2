from flask import Flask, render_template, url_for, request, jsonify
import google.generativeai as genai

app = Flask(__name__)
genai.configure(api_key="api")
model = genai.GenerativeModel("gemini-pro")

@app.route('/')
def home():
    return render_template('index.html', title="Jay Portfolio")

@app.route("/ask_gemini", methods=["POST"])
def ask_gemini():
    try:
        user_input = request.json.get("query")
        if not user_input:
            return jsonify({"error": "No query provided"}), 400

        response = model.generate_content(user_input)
        return jsonify({"response": response.text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
