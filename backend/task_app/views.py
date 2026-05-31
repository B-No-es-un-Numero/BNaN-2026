from rest_framework.response import Response
from rest_framework.views import APIView as ApiView
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db.models import Q
from task_app.models import Task
from task_app.serializer import TaskSerializer


class TaskView(ApiView):

    def get(self, request, pk=None):

        if pk:
            task = get_object_or_404(Task, id=pk);
            serializer = TaskSerializer(task);
        else:
            tasks = Task.objects.filter(enabled=True);
            client_id = request.query_params.get('client');
            status_filter = request.query_params.get('status');
            assigned_user = request.query_params.get('assigned_user');

            if client_id:
                tasks = tasks.filter(client_id=client_id);
            if status_filter:
                tasks = tasks.filter(status=status_filter);
            if assigned_user:
                tasks = tasks.filter(assigned_user_id=assigned_user);

            search = request.query_params.get('search', '');
            if search:
                tasks = tasks.filter(
                    Q(title__icontains=search) |
                    Q(description__icontains=search) |
                    Q(client__name__icontains=search) |
                    Q(assigned_user__first_name__icontains=search) |
                    Q(assigned_user__last_name__icontains=search)
                )

            serializer = TaskSerializer(tasks, many=True);

        return Response(serializer.data, status=status.HTTP_200_OK);

    def post(self, request):
        serializer = TaskSerializer(data=request.data);
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            );
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        );

    def put(self, request, pk=None):
        task = get_object_or_404(Task, id=pk);
        protected_fields = ['id', 'client'];
        data = request.data.copy();
        
        for field in protected_fields:
            data.pop(field, None)

        serializer = TaskSerializer(
            task,
            data=data,
            partial=True
        );

        if serializer.is_valid():
            serializer.save();
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            );
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        );

    def delete(self, request, pk=None):
        task = get_object_or_404(Task, id=pk);
        hard = request.query_params.get("hard", "false").lower() in ["true"];

        if hard:
            task.delete();
            return Response(
                status=status.HTTP_204_NO_CONTENT
            );

        task.enabled = False;
        task.save();
        return Response(
            status=status.HTTP_204_NO_CONTENT
        );