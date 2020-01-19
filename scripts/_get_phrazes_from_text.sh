#!/bin/sh
# gives list of phrazed that contains text given at $1 phraze it key given at $2
# https://fraze.it/api.jsp
python3 -c "print('+'.join('$1'.strip().split()))" | xargs -I {} curl -s "https://fraze.it/api/phrase/{}/en/1/no/$2" | \
    python3 -c "import sys, json; [print(res['phrase']) for res in json.load(sys.stdin)['results']]"
