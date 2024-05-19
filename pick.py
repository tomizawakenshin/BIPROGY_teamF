from flask import Flask, jsonify, requests
from collections import defaultdict
from datetime import datetime

app = Flask(__name__)

# キントーンの設定
SUBDOMAIN = 'uuyjiffe0wf5'
APP_ID = 4
API_TOKEN = 'P1Gqws7UJpRvj8MTeenezpVAm5Ce7yrW9AeyYWHI'
#KINTONE_URL = f'https://SUBDOMAIN.cybozu.com/k/v1/'

@app.route('/get-data', methods=['GET'])
def get_data():
    # キントーンのデータを取得する関数
    def get_kintone_data():
        url = f'https://SUBDOMAIN.cybozu.com/k/v1/'
        headers = {
            'X-Cybozu-API-Token': KINTONE_API_TOKEN,
            'Content-Type': 'application/json'
        }
        payload = {
            'app': KINTONE_APP_ID,
            'query': '',  # 必要に応じてクエリを追加
            'fields': ['user_name', 'status', 'timestamp']
        }
        
        response = requests.get(url, headers=headers, params=payload)
        if response.status_code == 200:
            return response.json().get('records', [])
        else:
            return None
    
    kintone_data = get_kintone_data()
    if kintone_data:
        return jsonify(kintone_data), 200
    else:
        return jsonify({'error': 'データの取得に失敗しました'}), 500

if __name__ == '__main__':
    app.run(debug=True)