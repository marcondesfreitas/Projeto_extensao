from django.urls import path

from .views import (
    posts_list_create,
    post_update_status,
    post_delete,
)


urlpatterns = [
    path(
        'postagens/',
        posts_list_create,
        name='posts-list-create'
    ),

    path(
        'postagens/<int:pk>/status/',
        post_update_status,
        name='post-update-status'
    ),

    path(
        'postagens/<int:pk>/',
        post_delete,
        name='post-delete'
    ),
]