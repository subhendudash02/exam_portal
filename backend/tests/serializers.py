from rest_framework import serializers
from .models import TestModel

class TestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TestModel
        fields = ('test_id', 'test_name', 'start', 'end')