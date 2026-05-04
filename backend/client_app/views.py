from rest_framework.response import Response
from rest_framework.views import APIView as ApiView
from rest_framework import status
from client_app.models import Client
from client_app.serializers import ClientSerializer
from django.shortcuts import get_object_or_404

class ClientView(ApiView):
        
    def get(self, request, pk=None):
        if pk:
            client = get_object_or_404(Client, id=pk);
            serializer = ClientSerializer(client);
        else:
            clients = Client.objects.all();
            serializer = ClientSerializer(clients, many=True);
        return Response(serializer.data, status=status.HTTP_200_OK);

    def post(self, request):
        serializer = ClientSerializer(data=request.data);
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data, status=status.HTTP_201_CREATED);
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST);

    def put(self, request, pk=None):
        client = get_object_or_404(Client, id=pk);
        serializer = ClientSerializer(client, data=request.data, partial=True);
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data);
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST);

def delete(self, request, pk=None,):
        client = get_object_or_404(Client, id=pk);
        hard = request.query_params.get("hard", "false").lower() in ["true"]
        if hard:
            client.delete();
            return Response(status=status.HTTP_204_NO_CONTENT);

        client.enabled = False
        client.save();
        return Response(status=status.HTTP_204_NO_CONTENT);