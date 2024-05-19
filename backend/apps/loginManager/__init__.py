from flask import Blueprint

# Blueprintオブジェクトを作成
login_blueprint = Blueprint('login', __name__)

# login.pyから必要な関数やエンドポイントをインポートする
from .login import login, check_login

# エンドポイントをBlueprintに登録する
login_blueprint.add_url_rule('/api/register', methods=['POST'], view_func=login)
login_blueprint.add_url_rule('/api/check_login', methods=['GET'], view_func=check_login)
