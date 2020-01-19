#!/bin/sh
# translates selected text with lang given at $1 (en-ru, ru-en) with yandex translate key fetched from secrets-provider
curl -s "localhost:8000/yandex_api_key" | xargs -I {} "$PWD/_translate_text.sh" $(xsel -o) "$1" "{}"
