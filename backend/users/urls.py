from django.urls import path
from .views import login_view, cadastro, solicitar_redefinicao, redefinir_senha

urlpatterns = [
    path("login/", login_view, name="login"),
    path("cadastrar-usuario/", cadastro, name="cadastrar_usuario"),
    path("solicitar-redefinicao/", solicitar_redefinicao, name="solicitar_redefinicao"),
    path("redefinir-senha/", redefinir_senha, name="redefinir_senha"),
]

