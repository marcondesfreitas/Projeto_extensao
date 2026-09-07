from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, PasswordResetToken
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import uuid
from django.core.mail import send_mail


@api_view(["POST"])
def cadastro(request):
    print(">>> Dados recebidos:", request.data)
    print(">>> Arquivos recebidos:", request.FILES)

    nome = request.data.get("nome")
    email = request.data.get("email")
    cpf = request.data.get("cpf")
    senha = request.data.get("senha")
    telefone = request.data.get("telefone")
    localizacao = request.data.get("localizacao")

    foto_perfil = request.FILES.get("foto_perfil")
    comprovante_residencia = request.FILES.get("comprovante_residencia")

    if User.objects.filter(email=email).exists():
        return Response(
            {"erro": "Usuário já existente"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(cpf=cpf).exists():
        return Response(
            {"erro": "Usuário com CPF já cadastrado"},
            status=status.HTTP_400_BAD_REQUEST
        )

    usuario = User.objects.create(
        nome=nome,
        email=email,
        senha=make_password(senha),
        telefone=telefone,
        localizacao=localizacao,
        cpf=cpf,
        foto_perfil=foto_perfil,
        comprovante_residencia=comprovante_residencia
    )

    return Response(
        {
            "msg": "Usuário criado com sucesso",
            "id": usuario.id
        },
        status=status.HTTP_201_CREATED
    )


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            email = data.get("email")
            senha = data.get("senha")

        except json.JSONDecodeError:
            return JsonResponse(
                {"erro": "Dados inválidos"},
                status=400
            )

        try:
            user = User.objects.get(email=email)

            if check_password(senha, user.senha):
                foto_url = None
                comprovante_url = None

                if user.foto_perfil:
                    foto_url = request.build_absolute_uri(
                        user.foto_perfil.url
                    )

                if user.comprovante_residencia:
                    comprovante_url = request.build_absolute_uri(
                        user.comprovante_residencia.url
                    )

                user_data = {
                    "id": user.id,
                    "nome": user.nome,
                    "email": user.email,
                    "telefone": user.telefone,
                    "cpf": user.cpf,
                    "papel": user.papel,
                    "perfil": user.perfil,
                    "localizacao": user.localizacao,
                    "foto_perfil": foto_url,
                    "comprovante_residencia": comprovante_url,
                }

                return JsonResponse({
                    "message": "Login realizado com sucesso!",
                    "user": user_data
                })

            return JsonResponse(
                {"erro": "Senha incorreta"},
                status=401
            )

        except User.DoesNotExist:
            return JsonResponse(
                {"erro": "Usuário não encontrado"},
                status=404
            )

    return JsonResponse(
        {"erro": "Método não permitido"},
        status=405
    )


@api_view(["GET", "PUT", "PATCH"])
def editar_usuario(request, user_id):
    try:
        usuario = User.objects.get(id=user_id)

    except User.DoesNotExist:
        return Response(
            {"erro": "Usuário não encontrado"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        foto_url = None
        comprovante_url = None

        if usuario.foto_perfil:
            foto_url = request.build_absolute_uri(
                usuario.foto_perfil.url
            )

        if usuario.comprovante_residencia:
            comprovante_url = request.build_absolute_uri(
                usuario.comprovante_residencia.url
            )

        return Response({
            "id": usuario.id,
            "nome": usuario.nome,
            "email": usuario.email,
            "telefone": usuario.telefone,
            "cpf": usuario.cpf,
            "localizacao": usuario.localizacao,
            "perfil": usuario.perfil,
            "papel": usuario.papel,
            "foto_perfil": foto_url,
            "comprovante_residencia": comprovante_url,
        })

    nome = request.data.get("nome")
    email = request.data.get("email")
    telefone = request.data.get("telefone")
    cpf = request.data.get("cpf")
    localizacao = request.data.get("localizacao")
    perfil = request.data.get("perfil")
    senha = request.data.get("senha")

    foto_perfil = request.FILES.get("foto_perfil")
    comprovante_residencia = request.FILES.get(
        "comprovante_residencia"
    )

    if nome:
        usuario.nome = nome

    if email and email != usuario.email:
        if User.objects.filter(email=email).exclude(
            id=usuario.id
        ).exists():
            return Response(
                {"erro": "Este email já está sendo usado"},
                status=status.HTTP_400_BAD_REQUEST
            )

        usuario.email = email

    if telefone and telefone != usuario.telefone:
        if User.objects.filter(telefone=telefone).exclude(
            id=usuario.id
        ).exists():
            return Response(
                {"erro": "Este telefone já está sendo usado"},
                status=status.HTTP_400_BAD_REQUEST
            )

        usuario.telefone = telefone

    if cpf and cpf != usuario.cpf:
        if User.objects.filter(cpf=cpf).exclude(
            id=usuario.id
        ).exists():
            return Response(
                {"erro": "Este CPF já está sendo usado"},
                status=status.HTTP_400_BAD_REQUEST
            )

        usuario.cpf = cpf

    if localizacao:
        usuario.localizacao = localizacao

    if perfil:
        usuario.perfil = perfil

    if senha:
        usuario.senha = make_password(senha)

    if foto_perfil:
        usuario.foto_perfil = foto_perfil

    if comprovante_residencia:
        usuario.comprovante_residencia = comprovante_residencia

    usuario.save()

    foto_url = None

    if usuario.foto_perfil:
        foto_url = request.build_absolute_uri(
            usuario.foto_perfil.url
        )

    return Response({
        "msg": "Perfil atualizado com sucesso!",
        "user": {
            "id": usuario.id,
            "nome": usuario.nome,
            "email": usuario.email,
            "telefone": usuario.telefone,
            "cpf": usuario.cpf,
            "localizacao": usuario.localizacao,
            "perfil": usuario.perfil,
            "papel": usuario.papel,
            "foto_perfil": foto_url,
        }
    })


@csrf_exempt
def solicitar_redefinicao(request):
    if request.method != "POST":
        return JsonResponse(
            {"erro": "Método não permitido"},
            status=405
        )

    try:
        data = json.loads(request.body)
        email = data.get("email")

        if not email:
            return JsonResponse(
                {"erro": "Informe o email"},
                status=400
            )

        user = User.objects.get(email=email)

        PasswordResetToken.objects.filter(user=user).delete()

        token = str(uuid.uuid4())

        PasswordResetToken.objects.create(
            user=user,
            token=token
        )

        link = f"http://localhost:3000/redefinir-senha?token={token}"

        send_mail(
            "Redefinir senha - Vigia",
            f"""Olá, {user.nome}!

Recebemos uma solicitação para redefinir sua senha no Vigia.

Clique no link abaixo para criar uma nova senha:

{link}

Se você não solicitou essa alteração, ignore este email.

Este link é válido por tempo limitado.

Equipe Vigia
""",
            "vigialocalcariri@gmail.com",
            [email],
            fail_silently=False,
        )

        return JsonResponse({
            "message": "Email enviado com sucesso!"
        })

    except User.DoesNotExist:
        return JsonResponse(
            {"erro": "Email não cadastrado"},
            status=404
        )

    except Exception as e:
        print("ERRO AO ENVIAR EMAIL:", e)

        return JsonResponse(
            {"erro": "Não foi possível enviar o email"},
            status=500
        )


@csrf_exempt
def redefinir_senha(request):
    if request.method != "POST":
        return JsonResponse(
            {"erro": "Método não permitido"},
            status=405
        )

    try:
        data = json.loads(request.body)

        token = data.get("token")
        nova_senha = data.get("nova_senha")

        if not token:
            return JsonResponse(
                {"erro": "Token não informado"},
                status=400
            )

        if not nova_senha:
            return JsonResponse(
                {"erro": "Nova senha não informada"},
                status=400
            )

        token_obj = PasswordResetToken.objects.get(
            token=token
        )

        if not token_obj.is_valid():
            token_obj.delete()

            return JsonResponse(
                {"erro": "Token expirado"},
                status=400
            )

        user = token_obj.user

        user.senha = make_password(nova_senha)
        user.save()

        token_obj.delete()

        return JsonResponse({
            "message": "Senha alterada com sucesso!"
        })

    except PasswordResetToken.DoesNotExist:
        return JsonResponse(
            {"erro": "Token inválido"},
            status=400
        )

    except Exception as e:
        print("ERRO AO REDEFINIR SENHA:", e)

        return JsonResponse(
            {"erro": "Erro ao redefinir senha"},
            status=500
        )