from django.urls import path

from .views import (
    login_view,
    cadastro,
    solicitar_redefinicao,
    redefinir_senha,
    editar_usuario,
)


urlpatterns = [
    path(
        "login/",
        login_view,
        name="login"
    ),

    path(
        "cadastrar-usuario/",
        cadastro,
        name="cadastrar_usuario"
    ),

    path(
        "usuario/<int:user_id>/",
        editar_usuario,
        name="editar_usuario"
    ),

    path(
        "solicitar-redefinicao/",
        solicitar_redefinicao,
        name="solicitar_redefinicao"
    ),

    path(
        "redefinir-senha/",
        redefinir_senha,
        name="redefinir_senha"
    ),
]