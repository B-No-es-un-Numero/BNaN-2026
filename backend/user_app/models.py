from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('user', 'Usuario estandar'),
    ]

    id = models.BigAutoField(primary_key=True, editable=False)

    email = models.EmailField(
        max_length=150, 
        unique=True,    
        help_text="Correo electrónico único del usuario."
    )   

    role = models.CharField(
        max_length=50, 
        choices=ROLE_CHOICES,
        default='user',
        help_text="Rol del usuario (e.g., admin, user)."
    )

    enabled = models.BooleanField(
        default=True, 
        help_text="Indica si el usuario está habilitado."
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email';
    REQUIRED_FIELDS = ['username'];

    def __str__(self):
        return self.email
