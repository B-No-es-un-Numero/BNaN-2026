from rest_framework.response import Response
from rest_framework.views import APIView as ApiView
from client_app.models import Client
from client_app.serializers import ClientSerializer
from django.shortcuts import get_object_or_404

class ClientView(ApiView):
        
    def get(self, request, pk=None):
        if pk:
            client = get_object_or_404(Client, id=pk)
            serializer = ClientSerializer(client)
        else:
            clients = Client.objects.all()
            serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)
    