from django.db import models
from django.core.validators import RegexValidator
from client_app.enum import STATUS_CHOICES
from company_app.models import Company
from user_app.models import User

class Client(models.Model):
    class Meta:
        db_table= "clientes";

    id = models.BigAutoField(primary_key=True, editable=False)

    name = models.CharField(
        max_length=100,
        help_text="Nombre completo del cliente."
    )

    email = models.EmailField(
        unique=True,
        help_text="Correo electrónico único."
    )

    dni = models.CharField(
        max_length=8,
        unique=True,
        validators=[RegexValidator(r'^\d{7,8}$')],
        help_text="Número de documento (7 u 8 dígitos)."
    )

    date_of_birth = models.DateField(
        help_text="Fecha de nacimiento."
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text="Teléfono de contacto."
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES.choices,
        default=STATUS_CHOICES.LEAD,
        help_text="Estado del cliente."
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='clients'
    )
    
    responsible_user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='responsible_clients'
    )

    enabled = models.BooleanField(
        default=True,
        help_text="Indica si el cliente está activo en el sistema."
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.name} ({self.status})"
