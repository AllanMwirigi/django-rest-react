
from rest_framework import serializers
from django.contrib.auth import get_user_model # If used custom user model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)

  def create(self, validated_data):

    user = UserModel.objects.create(
        # username=validated_data['username']
        email=validated_data['email']
    )
    user.set_password(validated_data['password'])
    user.save()

    return user

  class Meta:
    model = UserModel
    fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
  def validate(self, attrs): # validate data coming in against the model fields
    # attrs is a dictionary of the request data i.e. user credentials
    data = super().validate(attrs) # returns JSON with access and refresh token if user is valid or 401 error
    # token = self.get_token(self.user) # returns access token
    # data['user'] = str(self.user) # can add additional data to the response object
    # data['id'] = self.user.id
    return data

