#!/bin/sh
# translates text; pastes text and translation to vim; saves it to anki
[ -z "$1" ] && echo "Give text to translate" && exit 1;\
text=$1
echo "preparing to translate '$1'"
FILENAME=$(mktemp)
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd )"

checkanki() {
    curl localhost:8765 -s -X POST -d "{\"action\": \"deckNames\", \"version\": 6}" || { notify-send "anki desktop not started or ankiconnect not installed" && exit 1; }
}

addnoteanki() {
    curl localhost:8765 -s -X POST -d "{\"action\":\"addNote\",\"version\":6,\"params\":{\"note\":{\"deckName\":\"vlamitin_desk\",\"modelName\":\"Basic\",\"fields\":{\"Front\":\"$(head -n 1 "$FILENAME")\",\"Back\":\"$(tail -n 1 "$FILENAME")\"},\"options\":{\"allowDuplicate\":false},\"tags\":[]}}}" 2>&1 | xargs -0 notify-send
}

save_translated() {
    "$DIR/_translate_text.sh" "$text" "en-ru" > "$FILENAME"
    st vim "$FILENAME"
    addnoteanki
    rm "$FILENAME"
}

checkanki && save_translated
