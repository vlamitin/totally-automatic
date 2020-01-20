#!/bin/sh
# saves translation to anki
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd )"
"$DIR/get_phrazes_from_selected.sh" | dmenu -l 10 | tr -d '\n' |  xargs -0 "$DIR/_translate_and_save.sh"
