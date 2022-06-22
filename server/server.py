from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

from model import get_colors_from_image

app = Flask(__name__)
CORS(app)


@app.route('/generateColors', methods=['POST'])
def generate_colors():

    try:
        image = request.files["image"]
        nb_colors = int(request.form["nb_colors"])
    except Error:
        return jsonify({"colors": []})

    image = Image.open(image.stream)
    colors = get_colors_from_image(image, nb_colors)

    return jsonify({"colors": colors})


if __name__ == '__main__':
    app.run(debug=True)
