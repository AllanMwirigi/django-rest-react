
from rest_framework import serializers
from .models import Task

# this will return json representation of the model object
class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task # the model to serialize
    fields = '__all__' # the fields to display, all of them in this case
