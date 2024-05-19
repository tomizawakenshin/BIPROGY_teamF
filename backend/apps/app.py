from flask import Flask
from pointManager.point import point_app
from loginManager.login import login_app

app = Flask(__name__)
app.register_blueprint(point_app)
app.register_blueprint(login_app)

@app.route('/')
def index():
    return 'Hello from point_app!'

if __name__ == "__main__":
    app.run(debug=True)