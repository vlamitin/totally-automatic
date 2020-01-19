#!/bin/sh
# translates selected text with ru-en
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd )";\
"$DIR/_translate_selected.sh" "ru-en"
