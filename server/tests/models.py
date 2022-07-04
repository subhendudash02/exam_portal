from django.db import models

# Create your models here.

class TestModel(models.Model):
    test_id = models.AutoField(primary_key=True)
    test_name = models.CharField(max_length=150, unique=True)
    teacher_name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    start = models.DateTimeField()
    end = models.DateTimeField()

class QuestionModel(models.Model):
    question_id = models.ForeignKey(TestModel, on_delete=models.CASCADE, related_name='questions', null=True, blank=True)
    question_name = models.CharField(max_length=100, default="question")
    colA = models.TextField(max_length=1000, default="colA")
    colB = models.TextField(max_length=1000, default="colA")
