from django.urls import path
from .views import posts_list_create

urlpatterns = [
    path('', posts_list_create),
]
