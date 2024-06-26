from django.db import models

# Create your models here.

class User_details(models.Model):
    username = models.CharField(max_length=20)
    branch = models.CharField(max_length=20,default="null")
    semester = models.IntegerField(default=0)
    roomno = models.IntegerField(default=0)
    password = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    usertype =models.CharField(
        max_length=20,
        choices=[
            ('Student','Student'),
            ('Supervisor','Supervisor'),
            ('Security','Security')
            ]
        )

    def __str__(self):
        return f'{self.username} - {self.usertype}'
    
class Complaint(models.Model):
    student = models.ForeignKey(
        User_details, 
        on_delete=models.CASCADE, 
        related_name='student_complaints', 
        limit_choices_to={'usertype': 'Student'}
    )
    supervisor = models.ForeignKey(
        User_details, 
        on_delete=models.CASCADE, 
        related_name='supervisor_complaints', 
        limit_choices_to={'usertype': 'Supervisor'},
        null=True, 
        blank=True
    )
    description = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('Pending', 'Pending'),
            ('Resolved', 'Resolved')
        ],
        default='Pending'
    )
    complaint_type = models.CharField(
        max_length=50,
        choices=[
            ('Maintenance', 'Maintenance'),
            ('Cleanliness', 'Cleanliness'),
            ('Food', 'Food'),
            ('Other', 'Other')
        ]
    )
    image = models.ImageField(upload_to='complaint_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.student.username} - {self.complaint_type}'