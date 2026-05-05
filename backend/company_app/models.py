import uuid
from django.db import models

class Company(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    name = models.CharField(
        max_length=150,
        help_text="Nombre completo de la empresa."
    )
    
    cuil = models.CharField(
        max_length=20,
        unique=True,
        help_text="Número de CUIL."
    )
    
    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="Teléfono de contacto."
    )
    
    email = models.EmailField(
        max_length=254,
        unique=True,
        help_text="Correo electrónico único."
    )
    
    enabled = models.BooleanField(
        default=True,
        help_text="Indica si la empresa está activa en el sistema."
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    
    updated_at = models.DateTimeField(
        auto_now=True
    )
    
    def __str__(self):
        return self.name