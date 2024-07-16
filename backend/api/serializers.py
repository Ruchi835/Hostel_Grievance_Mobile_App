from rest_framework import serializers # type: ignore
from .models import User_details, Complaint
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }


class UserDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    class Meta:
        model = User_details
        fields = ['id','user','branch', 'semester', 'roomno', 'usertype']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password']
        )
        # print("User:", user.id)
        User_details.objects.create(
            user=user,
            branch=validated_data['branch'],
            semester=validated_data['semester'],
            roomno=validated_data['roomno'],
            usertype=validated_data['usertype']
        )
        return user
  
class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'