from flask import Flask
from pointManager.point import app as point_app
from loginManager.login import app as login_app

app = Flask(__name__)
app.register_blueprint(point_app)
app.register_blueprint(login_app)

if __name__ == "__main__":
    app.run(debug=True)
