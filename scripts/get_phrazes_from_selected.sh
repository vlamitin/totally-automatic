#!/bin/sh
# gives list of phrazed that contains selected text with use of fraze it key feched from secrets-provider
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd )";\
curl -s "localhost:8000/fraze_it_api_key" | xargs -I {} "$DIR/_get_phrazes_from_text.sh" "$(xsel -o)" "{}"
