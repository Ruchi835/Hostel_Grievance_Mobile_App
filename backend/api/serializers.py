from rest_framework import serializers # type: ignore
from .models import User_details, Complaint

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_details
        fields = '__all__'

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'
