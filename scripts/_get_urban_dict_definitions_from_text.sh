#!/bin/sh
# gives list of urban dictionary definitions with examples from text given at $1 api key given at $2
# https://rapidapi.com/community/api/urban-dictionary

curl -s -G --request GET \
	--url "https://mashape-community-urban-dictionary.p.rapidapi.com/define" \
	--data-urlencode "term=$1" \
	--header "x-rapidapi-host: mashape-community-urban-dictionary.p.rapidapi.com" \
	--header "x-rapidapi-key: $2" \
  | python3 -c "import sys, json; print('''$1'''); [print(res['definition']) for res in json.load(sys.stdin)['list']]"
