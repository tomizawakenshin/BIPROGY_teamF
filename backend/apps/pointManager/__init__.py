from flask import Flask
from .point import point_app

def create_app():
    app = Flask(__name__)
    
    # point_appのブループリントを登録
    app.register_blueprint(point_app)
    
    return app
