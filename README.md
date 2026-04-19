# Gestión Total App - BNaN

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

## Descripción general
Esta aplicación web centraliza la información de clientes, acciones realizadas y por realizar en un único sistema accesible por todo el equipo de trabajo. Permite gestionar clientes, estados, interacciones y tareas. De este modo, organiza la información de forma estructurada y accesible. 

El **problema principal** que aborda es la fragmentación de la información: los datos de clientes, el historial de interacciones y las tareas de seguimiento se encuentran distribuidos en múltiples fuentes, lo que genera duplicaciones, inconsistencias, pérdida de información y falta de visibilidad sobre el estado real de cada cliente.

La aplicación propone como **solución** un sistema único que permite:
* Centralizar la información de clientes.
* Mantener un historial básico de acciones.
* Gestionar estados de clientes (lead, activo, cerrado).
* Asignar responsables.
* Organizar tareas de seguimiento.

**Propuesta de valor**: Gestion Total App reduce de errores por duplicación de datos y mejora el seguimiento y control de clientes. También aporta mayor visibilidad del estado de cada caso, así como de las tareas realizadas y pendientes. Esto garantiza la organización del trabajo diario de modo simple y accesible.

> **Pensada para equipos pequeños (ventas/soporte) sin herramientas formales, facilitando el seguimiento del ciclo de vida de un cliente (Lead a Cerrado).**

## Requerimientos

#### Requerimientos funcionales
* Crear, editar, eliminar y visualizar clientes.
* Validar unicidad de clientes (email y/o DNI).
* Buscar clientes por nombre o email.
* Registrar y gestionar tareas asociadas a clientes.
* Asignar un usuario responsable a cada cliente.

#### Requerimientos no funcionales
* Seguridad básica: autenticación y control de acceso por rol.
* Consistencia de datos mediante validaciones.
* Estructura simple que permita futuras extensiones.

---

## Estructura del Proyecto

El repositorio está dividido de manera modular en 3 carpetas principales:

- `backend/`: Código fuente de la API construida en Django.
- `frontend/`: Código fuente de la interfaz desarrollada en Angular.
- `documents/`: Archivos auxiliares como el script de base de datos SQL inicial (`Gestion Total SQL insertions.sql`).

---

## Guía de Instalación y Uso (Local)

Seguí estos pasos en orden para ejecutar todo el ecosistema del proyecto en tu máquina.

### Prerrequisitos
Asegurate de contar con lo siguiente instalado en tu sistema:
- [Node.js](https://nodejs.org/) y npm
- [Python 3](https://www.python.org/) y pip
- Un gestor o motor de MySQL.

### Paso 1: Configurar la Base de Datos

1. Ejecutá el script SQL provisto para crear la base de datos en MySQL, con sus tablas e inserción de datos.

### Paso 2: Levantar el Backend (Django)

1. Abrí una terminal y dirigite a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Creá e iniciá un entorno virtual:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. Instalá las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Creá el archivo de variables de entorno:
   - Hacé una copia del archivo `.env_example` y renombralo a `.env`.
   - Modificalo para que coincida con tus credenciales locales de MySQL. Asegurate de tener `DB_NAME=gestion_total_app`.
5. Construí las tablas de la base de datos:
   ```bash
   python manage.py migrate
   ```
6. Iniciá el servidor backend:
   ```bash
   python manage.py runserver
   ```
   *(Estará disponible en `http://127.0.0.1:8000`)*
7. Endpoints disponibles:

* `/api/clientes`
* `/api/clientes/{uuid}`

### Paso 3: Levantar el Frontend (Angular)

1. Abrí una nueva pestaña de la terminal y dirigite al proyecto de Angular:
   ```bash
   cd frontend/bnan-project
   ```
2. Instalá los módulos de Node:
   ```bash
   npm install
   ```
3. Iniciá el servidor de desarrollo:
   ```bash
   npm start
   ```
 
---

## Uso básico (próximamente)

* Registrar nuevos clientes mediante formulario. 
* Visualizar listado general con búsqueda y filtros.
* Editar información de clientes existentes.
* Asignar estado y responsable.
* Crear y gestionar tareas asociadas.
* Exportar listados para análisis externo.