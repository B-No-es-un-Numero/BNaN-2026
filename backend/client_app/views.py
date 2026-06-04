from rest_framework.response import Response
from rest_framework.views import APIView as ApiView
from rest_framework import status
from client_app.models import Client
from client_app.serializers import ClientSerializer
from django.shortcuts import get_object_or_404

from company_app.models import Company
from task_app.models import Task

class ClientView(ApiView):
        
    def get(self, request, pk=None):
        if pk:
            client = get_object_or_404(Client, id=pk);
            serializer = ClientSerializer(client);
        else:
            clients = Client.objects.filter(enabled=True);
            serializer = ClientSerializer(clients, many=True);
        return Response(serializer.data, status=status.HTTP_200_OK);

    def post(self, request):
        serializer = ClientSerializer(data=request.data);
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data, status=status.HTTP_201_CREATED);
        return Response({"message": "Hubo un error generando el cliente", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST);

    def put(self, request, pk=None):
        client = get_object_or_404(Client, id=pk);
        serializer = ClientSerializer(client, data=request.data, partial=True);
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data);
        return Response({"message": "Hubo un error modificando el cliente", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST);

    def delete(self, request, pk=None,):
        client = get_object_or_404(Client, id=pk);
        hard = request.query_params.get("hard", "false").lower() in ["true"]
        if hard:
            if request.user.role != "admin":
                raise self.permission_denied(request,
                message="Solo admin puede realizar borrado físico."
            );
            client.delete();
            return Response(status=status.HTTP_204_NO_CONTENT);

        otherClients = Client.objects.filter(company=client.company);
        if (otherClients.count() == 1):
            Company.objects.filter(pk= client.company.id).update(enabled=False);
        
        relatedTask = Task.objects.filter(client=client, enabled=True);
        relatedTask.update(enabled = False);
        
        client.enabled = False
        client.save();
        return Response(status=status.HTTP_204_NO_CONTENT);