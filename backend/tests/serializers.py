from rest_framework import serializers
from .models import QuestionModel, TestModel

class QuestionSerializer(serializers.ModelSerializer):
    # rows = RowSerializer(many=True)
    class Meta:
        model = QuestionModel
        fields = ("id", "question_name", "colA", "colB")

    # def create(self, validated_data):
    #     x = validated_data.pop('rows')
    #     instance = QuestionModel.objects.create(**validated_data)
    #     for i in x:
    #         RowModel.objects.add(row_id=instance,**i)
    #     return instance

class TestSerializer(serializers.HyperlinkedModelSerializer):
    questions = QuestionSerializer(many=True)
    class Meta:
        model = TestModel
        fields = ('test_id', 'test_name', 'teacher_name', 'category', 'start', 'end', 'questions')
        depth = 1
    
    def create(self, validated_data):
        x = validated_data.pop('questions')
        instance = TestModel.objects.create(**validated_data)
        for i in x:
            QuestionModel.objects.create(question_id=instance,**i)
        return instance