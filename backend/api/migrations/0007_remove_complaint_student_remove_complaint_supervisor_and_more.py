# Generated by Django 5.0.6 on 2024-06-24 08:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='complaint',
            name='student',
        ),
        migrations.RemoveField(
            model_name='complaint',
            name='supervisor',
        ),
        migrations.DeleteModel(
            name='Security',
        ),
        migrations.DeleteModel(
            name='Student',
        ),
        migrations.DeleteModel(
            name='Complaint',
        ),
        migrations.DeleteModel(
            name='Supervisor',
        ),
    ]
