from django.shortcuts import render
from rest_framework import viewsets
from .models import TestModel
from .serializers import TestSerializer

# Create your views here.

class TestViewSet(viewsets.ModelViewSet):
    queryset = TestModel.objects.all()
    serializer_class = TestSerializer