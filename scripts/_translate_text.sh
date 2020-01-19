#!/bin/sh
# translates text given at $1 with lang given at $2 (en-ru, ru-en, ...) with yandex translate key given at $3
curl -s -X "POST" "https://translate.yandex.net/api/v1.5/tr.json/translate?key=$3&text=$1&lang=$2"  | \
    python3 -c "import sys, json; print('$1'); print(json.load(sys.stdin)['text'][0])"
