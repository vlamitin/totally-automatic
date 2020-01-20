#!/bin/sh
# saves translation to anki
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd )"
xsel -o | xargs -0 "$DIR/_translate_and_save.sh"
