#!/bin/sh
# gives list of phrazed that contains selected text with use of fraze it key feched from secrets-provider
curl -s "localhost:8000/fraze_it_api_key" | xargs -I {} "$PWD/_get_phrazes_from_text.sh" $(xsel -o) "{}"
