#!/bin/sh
# translates selected text with en-ru
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd )";\
"$DIR/_translate_selected.sh" "en-ru"
