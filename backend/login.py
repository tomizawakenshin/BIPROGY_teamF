from flask import jsonify, request, make_response

@app.route("/api/register", mothods=["POST"])
def login():
    data = request.get_json()
    user_id = data.get("userId")
    display_name = data.get("displayName")
    id_token = data.get("idToken")

    # TODO: 上のuser_id, display_nameに加えて、statusとtotal_pointを適当な初期値に設定したユーザ情報をkintoneに登録

    # クッキーの作成
    response = make_response(jsonify({"message": "User registered successfully"}))
    response.set_cookie("idToken", id_token, httponly=True)

    return response

def check_login():
    user_id = request.cookies.get('userId')

    if not user_id:
        return jsonify({'loggedIn': False}), 401

    # ユーザーが存在するかどうかをチェック（ここでは簡略化）
    is_user_exist = # TODO: kintone上でidがuser_idのユーザが存在するか確認
    
    if is_user_exist:
        return jsonify({'loggedIn': True}), 200
    else:
        return jsonify({'loggedIn': False}), 401

