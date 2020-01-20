#!/bin/sh
# locks screen on idle
idle_time=180
sleep_time=30

while true
do
  sleep $sleep_time; [ $(xssstate -i) -gt $idle_time ] && i3lock -e -f -c 1d2021
done
