from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, PasswordResetToken


from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
import json

import uuid
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
import json

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
        return Response({"erro": "Usuário já existente"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(cpf=cpf).exists():
        return Response({"erro": "Usuário com CPF já cadastrado"}, status=status.HTTP_400_BAD_REQUEST)

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
        {"msg": "Usuário criado com sucesso"},
        status=status.HTTP_201_CREATED
    )

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        email = data.get("email")
        senha = data.get("senha")

        try:
            user = User.objects.get(email=email)

            if check_password(senha, user.senha):

                # Montando resposta completa do usuário
                user_data = {
                    "id": user.id,
                    "nome": user.nome,
                    "email": user.email,
                    "telefone": user.telefone,
                    "cpf": user.cpf,
                    "papel": user.papel,
                    "localizacao": user.localizacao,
                    "foto_perfil": user.foto_perfil.url if user.foto_perfil else None,
                    "comprovante_residencia": user.comprovante_residencia.url if user.comprovante_residencia else None,
                }

                return JsonResponse({
                    "message": "Login realizado com sucesso!",
                    "user": user_data
                })

            else:
                return JsonResponse({"erro": "senha incorreta"}, status=401)

        except User.DoesNotExist:
            return JsonResponse({"error": "usuario não encontrado"}, status=404)

    return JsonResponse({"error": "Método não permitido"}, status=405)
    # 1️⃣ Solicitar redefinição
@csrf_exempt
def solicitar_redefinicao(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        try:
            user = User.objects.get(email=email)
            token = str(uuid.uuid4())
            PasswordResetToken.objects.create(user=user, token=token)
            
            link = f"http://localhost:3000/redefinir-senha?token={token}"
            send_mail(
                "Redefinir senha",
                f"Clique no link para redefinir sua senha: {link}",
                "no-reply@seusite.com",
                [email],
                fail_silently=False,
            )
            return JsonResponse({"message": "Email enviado com sucesso!"})
        except User.DoesNotExist:
            return JsonResponse({"error": "Email não cadastrado"}, status=404)
    return JsonResponse({"error": "Método não permitido"}, status=405)

# 2️⃣ Redefinir senha
@csrf_exempt
def redefinir_senha(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = data.get("token")
        nova_senha = data.get("nova_senha")

        try:
            token_obj = PasswordResetToken.objects.get(token=token)
            if not token_obj.is_valid():
                return JsonResponse({"error": "Token expirado"}, status=400)
            
            user = token_obj.user
            user.senha = make_password(nova_senha)
            user.save()
            token_obj.delete()  # invalida token após uso
            return JsonResponse({"message": "Senha alterada com sucesso!"})
        except PasswordResetToken.DoesNotExist:
            return JsonResponse({"error": "Token inválido"}, status=400)
    
    return JsonResponse({"error": "Método não permitido"}, status=405)