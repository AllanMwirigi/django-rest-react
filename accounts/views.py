from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes # decorator to enable view work with djangorestframework
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import UserSerializer

UserModel = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def users(request):
  users = UserModel.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response(serializer.data)




