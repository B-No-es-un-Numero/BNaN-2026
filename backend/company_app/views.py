from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from client_app.models import Client
from .models import Company
from .serializers import CompanySerializer

class CompanyView(APIView):
    
    def get(self, request, pk=None):
        companies = Company.objects.all()
        if request.user.role != "admin":
            companies = companies.filter(enabled=True)

        if pk:
            company = get_object_or_404(companies, id=pk)
            serializer = CompanySerializer(company)
        else:
            serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"message": "Hubo un error generando la empresa", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, pk=None):
        company = get_object_or_404(Company, id=pk)
        # partial=True permite actualizar solo los campos que enviamos (PATCH en realidad, pero útil en PUT)
        serializer = CompanySerializer(company, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({"message": "Hubo un error modificando la empresa", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk=None):
        company = get_object_or_404(Company, id=pk)
        hard = request.query_params.get("hard", "false").lower() == "true"
        if hard:
            if request.user.role != "admin":
                raise self.permission_denied(request,
                message="Solo admin puede realizar borrado físico."
            );
            company.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)    
        
        relatedClients = Client.objects.filter(company=company, enabled=True);
        
        if (relatedClients.exists()):
            return Response({"message": "No se puede eliminar una empresa que tiene clientes asociados. Elimine o reasigne los clientes primero."}, status=status.HTTP_400_BAD_REQUEST);
        
        company.enabled = False
        company.save()
        return Response(status=status.HTTP_204_NO_CONTENT)