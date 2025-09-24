from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User

from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
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
    if request.method ==  "POST":
        data = json.loads(request.body)

        email = data.get("email")
        senha = data.get("senha")

        try: 
            user = User.objects.get(email=email)
            if check_password(senha, user.senha):
                return JsonResponse({"message": "Login realizado com sucesso!", "user": user.nome})
            else:
                return JsonResponse({"erro" : "senha incorreta"}, status=401)
        except User.DoesNotExist:
            return JsonResponse({"error":"usuario não encontrado"}, status=404)
    
    return JsonResponse({"error": "Método não permitido"}, status=405)