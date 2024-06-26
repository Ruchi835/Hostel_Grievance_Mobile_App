from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import User_details, Complaint
from .serializers import UserSerializer, ComplaintSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User_details.objects.all()
    serializer_class = UserSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
