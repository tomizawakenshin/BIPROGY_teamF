from flask import Flask, Blueprint
from .point import point_app

def create_pointManager_app():
    point_manager_app = Blueprint('point_manager_app', __name__)
    
    point_manager_app.register_blueprint(point_app)

    return point_manager_app
