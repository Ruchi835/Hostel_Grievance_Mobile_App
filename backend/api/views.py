import json
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import User_details, Complaint
from .serializers import UserSerializer, ComplaintSerializer,UserDetailsSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, views
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate

class UserViewSet(viewsets.ModelViewSet):
    queryset = User_details.objects.all()
    serializer_class = UserDetailsSerializer

    @action(detail=False,methods=['get'],url_path='get-students')
    def get_student_details(self,request):
        students=User_details.objects.filter(usertype='Student')
        serializer=self.get_serializer(students,many=True)
        return Response(serializer.data)



class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer


    @action(detail=False,methods=['get'],url_path='user-complaints/(?P<user_id>[^/.]+)')
    def get_user_complaints(self,request,user_id=None):
        complaints=Complaint.objects.filter(student=user_id)
        user_data=User_details.objects.filter(id=user_id).values()
        json_data = json.dumps(list(user_data))
        data = json.loads(json_data)
        print(data)
        serializer=self.get_serializer(complaints,many=True)
        print(serializer.data)
        return Response({"user": data[0],"complaints":serializer.data[0]})
    
    @action(detail=False,methods=['get'],url_path='pending-complaints')
    def get_pending_complaints(self,request):
        pending=Complaint.objects.filter(status='Pending')
        serializer=self.get_serializer(pending,many=True)
        return Response(serializer.data)
    

class RegisterView(views.APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserDetailsSerializer(data=request.data)
        #print("serial",request.data)

        if serializer.is_valid():
            user = serializer.save()
            print(user.id)
            return Response({'user_id':user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    print(f"Login attempt with email: {username}")

    user = authenticate(username=username,password=password)
    print(user)
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        user_data = User_details.objects.filter(user_id = user.id).values()
        json_data = json.dumps(list(user_data))
        data = json.loads(json_data)

        return Response({"user": data[0],'token': token.key})
    else:
        print("Login failed: Invalid Credentials")
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)