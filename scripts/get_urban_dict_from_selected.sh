#!/bin/sh
# gives list of urban dictionary definitions with examples that contains selected text with use of fraze it key feched from secrets-provider
DIR="$(cd "$( dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd )";\
curl -s "localhost:8000/urban_dict_rapid_api_key" | xargs -I {} "$DIR/_get_urban_dict_definitions_from_text.sh" "$(xsel -o)" "{}"
