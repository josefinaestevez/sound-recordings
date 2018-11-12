# Sound Recording Metadata Matcher Prototype

## Backend 

### Set Up

Enviroment

1. Create a virtualenv: `$ mkvirtualenv <name>`
2. Activate virtualenv: `$ workon <name>`
3. Install system dependencies: `$ sudo apt-get install python-dev libpq-dev postgresql`
4. Clone this repository `$ git clone https://github.com/josefinaestevez/sound-recordings`
6. Go to backend subfolder.
5. Install requirements: `$ pip install -r requirements.txt`

* If you don't have virtualenvwrapper installed, you can follow this [instructions](https://virtualenvwrapper.readthedocs.io/en/latest/)

Database

1. Create database

```bash
$ sudo -u postgresql psql
$ postgres=# CREATE DATABASE database;
$ postgres=# CREATE USER user WITH ENCRYPTED PASSWORD 'password';
$ postgres=# GRANT ALL PRIVILEGES ON DATABASE database TO user;
```

2. Change your default database config (settings.py) with the database configuration created above and postgres engine.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'database',
        'USER': 'user',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

3. Run migrations: `$ python manage.py migrate`

### Getting the candidates

1. Load sound recordings: `$ python manage.py load_sound_recordings sound_recordings.csv`
2. Load input report: `$ python manage.py load_input_report sound_recordings_input_report.csv`

### Running

`$ python manage.py runserver`

## Frontend

### Running

1. Go to frontend subfolder.
2. Run `npm start`

Thats it!

## Answers

* At first, for every input record I've filtered sound records that matchs with any of their corresponding fields. Then, to calculate similarity I've used SequenceMatcher, a python lib that has a ratio() method, which returns a float between 0 and 1 measuring the similarity of the sequences. I've calculated similarity of each field, and then the average.

* I would do changes to improve my solutions:

	- I would create a celery task to do the matching calculation. So if we have million objects in our database this keeps the task out of the application's context.
	- If we need this calculation beign fast, we could use Elastic Search to do fast queries with Sound Recording model.

* The only frontend framework with I have experience working with is Angular 1. As Angular has many newest and different versions, I've decided to learn a new framework, so I've choose React to implement this solution. And why React instead of Vue? According on what I've researched, has a bigger community and support and is the most popular framework out in these days.

* To improve the user experience:

	- Showing input reports, in case we have a large amount of input reports, I would show at first only a part of them to load page faster. I would add pagination and let users search by text to filter the table.
	- Once user clicks on one, I would clear the table, letting only the selected input report with their corresponding matches, with a back button to go back to the previous table
	- I would add a spinner with a message while candidate is being updated as selected.
	- Also I would add some messages, for example once user selects a match: "Candidate xxx was selected for input report xxx successfully! Now you can continue matching"