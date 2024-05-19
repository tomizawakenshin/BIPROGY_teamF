from flask import Flask
from apps.pointManager import create_app as create_pointManager_app
from apps.loginManager import create_app as create_loginManager_app

def create_main_app():
    app = Flask(__name__)

    point_manager_app = create_pointManager_app()
    login_manager_app = create_loginManager_app()

    app.register_blueprint(point_manager_app, url_prefix='/pointManager')
    app.register_blueprint(login_manager_app, url_prefix='/loginManager')

    return app

if __name__ == "__main__":
    app = create_main_app()
    app.run()
