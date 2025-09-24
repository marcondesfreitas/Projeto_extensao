from django.urls import path
from . import views

urlpatterns = [
    path('cadastrar-usuario/', views.cadastro, name='cadastrar_usuario'),
    path("login/", views.login_view, name="login"),
]