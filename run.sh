cd ./backend

docker build -f Dockerfile -t recordings-backend

# update docker-compose images
docker-compose -f docker-compose.yml stop web
docker-compose -f docker-compose.yml rm -f web
docker-compose -f docker-compose.yml stop
docker-compose -f docker-compose.yml up -d

# update database
docker-compose -f docker-compose.yml exec web python manage.py migrate
docker-compose -f docker-compose.yml exec web python manage.py clear_data
docker-compose -f docker-compose.yml exec web python manage.py load_sound_recordings sound_recordings.csv
docker-compose -f docker-compose.yml exec web python manage.py load_input_report sound_recordings_input_report.csv

# run frontend
cd ../
cd ./vue-frontend
npm i
npm run serve