from django.db import models

# Create your models here.
class TestModel(models.Model):
    test_id = models.AutoField(primary_key=True)
    test_name = models.CharField(max_length=150, unique=True)
    start = models.DateTimeField()
    end = models.DateTimeField()