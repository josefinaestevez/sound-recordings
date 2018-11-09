# Generated by Django 2.1.3 on 2018-11-09 14:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InputReport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artist', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('isrc', models.CharField(max_length=20)),
                ('duration', models.CharField(max_length=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('matched', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='InputReportMatch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('similarity_score', models.DecimalField(decimal_places=1, max_digits=2)),
                ('selected', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('input_report', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='matches', to='sound_recordings.InputReport')),
            ],
        ),
        migrations.CreateModel(
            name='SoundRecording',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artist', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('isrc', models.CharField(max_length=20)),
                ('duration', models.CharField(max_length=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='inputreportmatch',
            name='sound_recordings',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='sound_recordings.SoundRecording'),
        ),
    ]