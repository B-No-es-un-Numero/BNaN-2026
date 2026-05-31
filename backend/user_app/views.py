from re import search

from rest_framework.response import Response
from rest_framework.views import APIView as ApiView
from rest_framework import status
from user_app.models import User
from user_app.serializers import UserSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q


class RegisterView(ApiView):
    def post(self, request):
        serializer = UserSerializer(data=request.data);
        if serializer.is_valid():
            serializer.save();
            return Response(
                {"message": "Usuario registrado exitosamente"},
                status=status.HTTP_201_CREATED
            );
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST);


class UserView(ApiView):
    def get(self, request, pk=None):
        if pk:
            user = get_object_or_404(User, id=pk);
            serializer = UserSerializer(user);
        else:
            users = User.objects.filter(enabled=True);
            search = request.query_params.get('search', '');
            if search:
                users = users.filter(
                   Q(username__icontains=search) | 
                   Q(email__icontains=search)
                )
            serializer = UserSerializer(users, many=True);
        return Response(serializer.data, status=status.HTTP_200_OK);

    def post(self, request):
        serializer = UserSerializer(data=request.data);
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data, status=status.HTTP_201_CREATED);
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST);

    def put(self, request, pk=None):
        user = get_object_or_404(User, id=pk);
        serializer = UserSerializer(user, data=request.data, partial=True);
        if serializer.is_valid():
            serializer.save();
            return Response(serializer.data, status=status.HTTP_200_OK);
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST);

    def delete(self, request, pk=None):
        user = get_object_or_404(User, id=pk);
        hard = request.query_params.get("hard", "false").lower() in ["true"]
        if hard:
            user.delete();
            return Response(status=status.HTTP_204_NO_CONTENT);

        user.enabled = False
        user.save();
        return Response(status=status.HTTP_204_NO_CONTENT);
