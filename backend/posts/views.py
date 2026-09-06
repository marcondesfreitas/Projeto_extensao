from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Post
from .serializers import PostSerializer


@api_view(['GET', 'POST'])
def posts_list_create(request):
    if request.method == 'GET':
        autor_id = request.GET.get('autor_id')

        if autor_id:
            posts = Post.objects.filter(
                autor_id=autor_id
            ).order_by('-criado_em')
        else:
            posts = Post.objects.all().order_by('-criado_em')

        serializer = PostSerializer(
            posts,
            many=True
        )

        return Response(serializer.data)

    if request.method == 'POST':
        serializer = PostSerializer(
            data=request.data
        )

        if serializer.is_valid():
            autor_id = request.data.get('autor_id')

            if (
                not autor_id
                or autor_id == 'null'
                or not str(autor_id).isdigit()
            ):
                return Response(
                    {
                        "erro": "autor_id é obrigatório e deve ser um número válido"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save(
                autor_id=autor_id
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['PATCH'])
def post_update_status(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(
            {
                "erro": "Post não encontrado"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    novo_status = request.data.get('status')

    status_validos = [
        'pendente',
        'aprovado',
        'resolvido',
        'rejeitado'
    ]

    if novo_status not in status_validos:
        return Response(
            {
                "erro": f"status inválido. Use um destes: {status_validos}"
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    post.status = novo_status
    post.save()

    serializer = PostSerializer(post)

    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )


@api_view(['DELETE'])
def post_delete(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(
            {
                "erro": "Post não encontrado"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    post.delete()

    return Response(
        {
            "mensagem": "Postagem excluída com sucesso"
        },
        status=status.HTTP_200_OK
    )