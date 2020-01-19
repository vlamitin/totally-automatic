#!/bin/sh
# translates selected text with lang given at $1 (en-ru, ru-en)
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd )";\
"$DIR/_translate_text.sh" "$(xsel -o)" "$1"
