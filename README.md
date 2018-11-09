# Sound Recording Metadata Matcher Prototype

## Back end 

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