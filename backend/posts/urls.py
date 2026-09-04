from django.urls import path
from .views import posts_list_create
from .views import post_update_status

urlpatterns = [
    path('', posts_list_create),
    path('<int:pk>/status/', post_update_status),
]