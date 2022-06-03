from django.urls import path
from .views import Register, Login, UserView, LogOut

urlpatterns = [
    path('register', Register.as_view()),
    path('login', Login.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogOut.as_view()),
]