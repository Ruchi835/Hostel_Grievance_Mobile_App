# Generated by Django 5.0.6 on 2024-07-18 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_user_details_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_details',
            name='usertype',
            field=models.CharField(choices=[('Student', 'Student'), ('Admin', 'Admin'), ('Security', 'Security')], max_length=20),
        ),
    ]
