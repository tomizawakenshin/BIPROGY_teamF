#!/usr/bin/python
# _*_ coding: utf-8 _*_

import requests

from datetime import datetime
import pytz

from flask import Flask, jsonify, request

app = Flask(__name__)

now_utc = datetime.now(pytz.utc)
jst = pytz.timezone('Asia/Tokyo')
now_jst = now_utc.astimezone(jst)

URL="https://uuyjiffe0wf5.cybozu.com/k/v1/"

# ポイント取得情報の時系列DB
APPID=2
API_TOKEN="Cl48uaDkk7N0A3zVvW8EfyOgkh4enMcABgveJVk1"
PARAMS={
  "app":APPID,
  "record":{
    "Auth_id":{
        "value":"test_auth"
    },
    "date":{
        "value":now_jst.strftime('%Y-%m-%dT%H:%M:%S%z')
    },
    "points":{
        "value":1
    },
  }
}

# 合計ポイント集計DB
APPID2=3
API_TOKEN2="Y96bk2VbEoKLt239FXiFLxy8Lo5zeQxcK5FYniwF"
PARAMS2={
  "app":APPID2,
  "record":{
    "Auth_id":{
        "value":"test_auth"
    },
    "Total_Points":{
        "value":0
    },
  }
}


# -------------------------------- 関数定義 -----------------------------------
def post_kintone_record(url,api_token,params):
    """kintoneにレコードを1件登録する関数"""
    headers={"X-Cybozu-API-Token":api_token,"Content-Type":"application/json"}
    resp=requests.post(url+"record.json",json=params,headers=headers)

    return resp



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



def update_kintone_record(url, api_token, appid, recordid, auth_id, field_code, new_value):
    payload = {
        'app': appid,
        'id': recordid,
        'record': {
            'Auth_ID': {
                'value': auth_id
            },
            field_code: {
                'value': new_value
            }
        }
    }

    headers = {
        'X-Cybozu-API-Token': api_token,
        'Content-Type': 'application/json'
    }

    response = requests.put(url + "record.json", headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"レコードの更新に失敗しました: {response.status_code}")
        print(response.text)  # エラーメッセージを出力
        return None



def update_total_points(url, userid, points):
    records = get_kintone_record_by_uid(url, API_TOKEN2, APPID2, userid)

    if records:
        # 現在の合計ポイントを取得して+1
        record = records[0]
        current_points = int(record['Total_Points']['value'])
        new_points = current_points + points

        # レコードの更新
        record_id = record['$id']['value']
        auth_id = record['Auth_ID']['value']  # 必須フィールドを含める
        response = update_kintone_record(url, API_TOKEN2, APPID2, record_id, auth_id, 'Total_Points', new_points)

        # 結果の表示
        if response:
            print("レコードが正常に更新されました")
            print(response)
        else:
            print("レコードの更新に失敗しました")

# if __name__=="__main__":
#     RESP=update_total_points(URL, 888, 1)

    
#     print(RESP)

# ------------------------------ エンドポイントの定義 ----------------------------------
@app.route('/record/<userid>/<int:points>', methods=['POST'])
def update_totalPoints_endpoint(userid, points):
    return update_total_points(userid, points)

@app.route('/record/<userid>', methods=['GET'])
def get_totalPoints_endpoint(userid):
    records = get_kintone_record_by_uid(URL, API_TOKEN2, APPID2, userid)

    if records:
        record = records[0]
        current_points = int(record['Total_Points']['value'])
        return current_points
    else:
        return jsonify({"error": "No records found for the user"}), 404

@app.route('/record/<userid>', method=['POST'])