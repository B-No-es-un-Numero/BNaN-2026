from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task_app', '0004_alter_task_table'),
    ]

    operations = [
        migrations.RunSQL(
            sql=[
                "UPDATE tareas SET status = 'pending' WHERE status = 'Pendiente';",
                "UPDATE tareas SET status = 'in_progress' WHERE status = 'En progreso';",
                "UPDATE tareas SET status = 'cancelled' WHERE status = 'Cancelada';",
                "UPDATE tareas SET status = 'done' WHERE status = 'Completada';",
            ],
            reverse_sql=[
                "UPDATE tareas SET status = 'Pendiente' WHERE status = 'pending';",
                "UPDATE tareas SET status = 'En progreso' WHERE status = 'in_progress';",
                "UPDATE tareas SET status = 'Cancelada' WHERE status = 'cancelled';",
                "UPDATE tareas SET status = 'Completada' WHERE status = 'done';",
            ],
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(
                choices=[
                    ('pending', 'Pendiente'),
                    ('in_progress', 'En progreso'),
                    ('cancelled', 'Cancelada'),
                    ('done', 'Completada'),
                ],
                default='pending',
                help_text='Estado actual de la tarea.',
                max_length=15,
            ),
        ),
    ]
