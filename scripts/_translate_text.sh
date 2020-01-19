#!/bin/sh
# translates text given at $1 with lang given at $2 (en-ru, ru-en, ...) and yandex translate api key fetched from secrets-provider
# https://tech.yandex.com/translate/doc/dg/reference/translate-docpage/#JSON
curl -s "localhost:8000/yandex_api_key"\
    | xargs -I {} curl -G -s -X "POST" "https://translate.yandex.net/api/v1.5/tr.json/translate" --data-urlencode "key={}" --data-urlencode "text=$1" --data-urlencode "lang=$2" \
    | python3 -c "import sys, json; print('''$1'''); print(json.load(sys.stdin)['text'][0])"
