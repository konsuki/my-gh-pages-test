# Pythonの軽量イメージを使用
FROM python:3.10-slim

# ログがバッファされずにすぐ出力されるように設定（デバッグしやすくなります）
ENV PYTHONUNBUFFERED True

# 作業ディレクトリを設定
WORKDIR /app

# 依存ファイルをコピーしてインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをコピー
COPY . .

# ★ここが修正ポイント
# --host 0.0.0.0 と --port ${PORT} が必須です
CMD exec uvicorn api:app --host 0.0.0.0 --port ${PORT:-8080}