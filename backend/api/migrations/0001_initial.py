# Generated by Django 5.0.6 on 2024-07-22 15:06

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='User_details',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('branch', models.CharField(default='null', max_length=20)),
                ('semester', models.IntegerField(default=0)),
                ('roomno', models.IntegerField(default=0)),
                ('usertype', models.CharField(choices=[('Student', 'Student'), ('Admin', 'Admin'), ('Security', 'Security')], max_length=20)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Complaint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('Resolved', 'Resolved')], default='Pending', max_length=20)),
                ('complaint_type', models.CharField(choices=[('Maintenance', 'Maintenance'), ('Cleanliness', 'Cleanliness'), ('Food', 'Food'), ('Other', 'Other')], max_length=50)),
                ('image', models.ImageField(blank=True, null=True, upload_to='complaint_images/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('student', models.ForeignKey(limit_choices_to={'usertype': 'Student'}, on_delete=django.db.models.deletion.CASCADE, related_name='student_complaints', to='api.user_details')),
            ],
        ),
    ]
