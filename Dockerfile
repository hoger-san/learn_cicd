#　ベースとなるイメージを指定
FROM nginx:alpine
# ローカルのindex.htmlとstyle.cssをnginxが配信するディレクトリにコピー
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
# Nginxのデフォルトポート80を公開
EXPOSE 80
