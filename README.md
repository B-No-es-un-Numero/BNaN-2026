# Gestión Total App - BNaN

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

## Descripción general del proyecto
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

Para mayor detalle sobre requerimientos, se puede revisar el apartado específico de la [wiki](https://github.com/B-No-es-un-Numero/GestionTotal-BNaN-2026/wiki/Requisitos-Funcionales-y-No-Funcionales).

---

## Estructura del Proyecto

El repositorio está dividido de manera modular en 3 carpetas principales:

- `backend/`: Código fuente de la API construida en Django.
- `frontend/`: Código fuente de la interfaz desarrollada en Angular.
- `documents/`: Archivos auxiliares como el script de base de datos SQL inicial (`Gestion Total SQL insertions.sql`).

Para mayor detalle sobre la arquitectura del proyecto, se puede revisar el [anexo al documento PMI](https://docs.google.com/document/d/1fRECcmmsum6uZzUrU-YYKPl7DIBUYYHPoSA8BmNgO78/edit?usp=sharing), apartado 2.1.

---

## Guía de Instalación (Local)

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
5. Opcionalmente, para una puesta en marcha rápida con datos de prueba, ejecutá el script ubicado en la carpeta documents/, el cual crea la base de datos, genera las tablas necesarias e inserta registros iniciales de ejemplo.
6. Si omitiste el punto anterior, ahora construí las tablas de la base de datos. Si lo ejecutaste correctamente, podés desestimar este:
   ```bash
   python manage.py migrate
   ```
7. Ahora, iniciá el servidor backend:
   ```bash
   python manage.py runserver
   ```
   *(Estará disponible en `http://127.0.0.1:8000`)*
8. Endpoints disponibles (guía uso directo de Backend):
* `api/auth/register/` — `POST` (registro público de usuarios)
* `api/auth/login/` — `POST` (obtener tokens JWT de acceso/refresh)
* `api/auth/refresh/` — `POST` (renovar el token de acceso)
* `api/usuarios` — `GET` (listado de usuarios)
* `api/usuarios/{id}/` — `GET` / `PUT` / `DELETE` (detalle, edición y borrado; todo el `DELETE`, lógico o físico con `?hard=true`, solo admin)
* `api/clientes` — `GET` / `POST` (listado y creación)
* `api/clientes/{id}/` — `GET` / `PUT` / `DELETE` (detalle, edición y borrado; `DELETE ?hard=true` borrado físico, solo admin)
* `api/tareas/` — `GET` / `POST` (listado y creación)
* `api/tareas/{id}/` — `GET` / `PUT` / `DELETE` (detalle, edición y borrado; `DELETE ?hard=true` borrado físico, solo admin)
* `api/companias/` — `GET` / `POST` (listado y creación)
* `api/companias/{id}/` — `GET` / `PUT` / `DELETE` (detalle, edición y borrado; `DELETE ?hard=true` borrado físico, solo admin)

Para mayor detalle sobre los endpoints, sus requests y responses, se puede revisar el [anexo al documento PMI](https://docs.google.com/document/d/1fRECcmmsum6uZzUrU-YYKPl7DIBUYYHPoSA8BmNgO78/edit?usp=sharing), apartado 3.2 y 3.3.


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

## Guia de Uso (Local)

En este momento, backend y frontend se encuentran conectados. El manejo continúa siendo local, pero se estima será posible desplegar el mismo a la brevedad.

Una vez iniciadas ambas aplicaciones, el uso esperado consiste en:

* Registrarse con un email y nombre válidos.
* Iniciar sesión con el usuario dado de alta.
* Acceder desde la barra de navegación a las distintas vistas que componen el sistema:
-- Clientes
-- Empresas
-- Tareas
-- Usuarios (únicamente para rol administrador)
* En todas las vistas se puede:
-- Visualizar la lista completa de registros.
-- Filtrar por campos significativos.
-- Abrir registros para consultar sus detalles.
-- Editar registros con aplicación en tiempo real.
-- Eliminar registros para que dejen de figurar en el sistema (borrado lógico, disponible para todos los usuarios autenticados).
-- El borrado físico definitivo (recurso con `?hard=true`) está reservado únicamente para usuarios con rol administrador.
* Cerrar sesión.

---

## Integrantes del equipo y roles
* Bruvera, Melina Belén - Fullstack dev & Project Manager.
* Diván, Guillermo Mauricio - Fullstack dev & Product owner.
* García Pardo, Alejandro David - Fullstack dev.
* Natale, Gabriel Alejandro - Fullstack dev.
* Romero, Joaquín David - Fullstack dev.