import requests
from flask import Blueprint, jsonify, request, make_response, Flask

login_app = Blueprint('login_app', __name__)

@login_app.route('/login')
def index():
    return 'Hello from point_app!'

URL="https://uuyjiffe0wf5.cybozu.com/k/v1/"
# ユーザー情報管理DB
APPID3 = 6
API_TOKEN3="pHRbZwtEMLU9se9oVxKfSJ8OisiJDeuIML372l3S"

def get_kintone_record_by_uid(url, api_token, appid, userid):
    headers = {
        'X-Cybozu-API-Token': api_token,
        'Content-Type': 'application/json'
    }

    params = {
        'app': appid,
        'query': f'Auth_ID="{userid}"'
    }

    response = requests.get(url+"records.json",json=params,headers=headers)
    
    # レスポンスの解析
    if response.status_code == 200:
        data = response.json()
        return data.get('records', [])
    else:
        print(f"レコードの取得に失敗しました: {response.status_code}")
        return []

login_blueprint = Blueprint('login_blueprint', __name__)

def check_user_existence(url, userid):
    records = get_kintone_record_by_uid(url, API_TOKEN3, APPID3, userid)
    if records:
        return True
    else:
        return False


@login_app.route("/api/register", methods=["POST"])
def login():
    data = request.get_json()
    user_id = data.get("userId")
    display_name = data.get("displayName")
    id_token = data.get("idToken")

    # TODO: 上のuser_id, display_nameに加えて、statusとtotal_pointを適当な初期値に設定したユーザ情報をkintoneに登録
    params = {
        "app":APPID3,
        "record":{
            "Auth_ID":{
                "value":user_id
            },
            "user_name":{
                "value":display_name
            },
        }
    }
    if not check_user_existence(URL, user_id):
        headers={"X-Cybozu-API-Token":API_TOKEN3,"Content-Type":"application/json"}
        requests.post(URL+"record.json",json=params,headers=headers)

    # クッキーの作成
    response = make_response(jsonify({"message": "User registered successfully"}))
    response.set_cookie("idToken", id_token, httponly=True)

    return response

@login_app.route("/api/check-login", methods=["GET"])
def check_login():
    user_id = request.cookies.get('userId')

    if not user_id:
        return jsonify({'loggedIn': False}), 401

    # ユーザーが存在するかどうかをチェック（ここでは簡略化）
    is_user_exist = check_user_existence(URL, user_id)
    
    if is_user_exist:
        return jsonify({'loggedIn': True}), 200
    else:
        return jsonify({'loggedIn': False}), 401

# @login_app.route("/api/helloworld", methods=["GET"])
# def HelloWorld():
#     return "HelloWorld!"