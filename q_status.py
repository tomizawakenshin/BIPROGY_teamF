from flask import Flask, jsonify, requests
from collections import defaultdict
from datetime import datetime

app = Flask(__name__)

# キントーンの設定
SUBDOMAIN = 'uuyjiffe0wf5'
APP_ID = 5
API_TOKEN = 'Vj7t9N0qU8QpkXtiP86L139czYYEiLKMSkcpHztm'
#KINTONE_URL = f'https://SUBDOMAIN.cybozu.com/k/v1/'


# キントーンのレコードを更新する関数
def update_kintone_q_status(user_id, status):
    url = f'https://SUBDOMAIN.cybozu.com/k/v1/'
    headers = {
        'X-Cybozu-API-Token': API_TOKEN,
        'Content-Type': 'application/json'
    }
    now_utc = datetime.now(pytz.utc)
    jst = pytz.timezone('Asia/Tokyo')
    now_jst = now_utc.astimezone(jst)
    
    payload = {
        'app': APP_ID,
        'updateKey': {
            'field': 'user_id',
            'value': user_id
        },
        'record': {
            'status': {
                'value': status
            },
            'timestamp': {
                'value': now_jst.strftime('%Y-%m-%dT%H:%M:%S%z')
            }
        }
    }
    response = requests.put(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json(),timestamp
    else:
        return None, None

@app.route('()/status', methods=['PUT'])
def update_q_status():
    data = request.json
    user_id = data.get('user_id')
    status = data.get('status')
    
    response_json, timestamp = update_kintone_q_status(user_id, status)
    
    if response_json:        
        return jsonify({
            'status': status,
            'timestamp': timestamp,
            'userName': user_name
        }), 200
    else:
        return jsonify(response_json), status_code


if __name__ == '__main__':
    app.run(debug=True)
