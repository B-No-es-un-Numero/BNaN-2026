# 🚀 Gestión Total App - BNaN

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

Esta aplicación web centraliza la información de clientes, empresas, acciones realizadas y por realizar en un único sistema accesible por todo el equipo de trabajo. Permite gestionar clientes, estados, interacciones y tareas. De este modo, organiza la información de forma estructurada y accesible. 

> 💡 **Objetivo:** Pensada para equipos pequeños (ventas/soporte) sin herramientas formales, facilitando el seguimiento del ciclo de vida de un cliente (Lead a Cerrado).

---

## 🛠️ Tecnologías Utilizadas

### Frontend
* **Framework:** Angular 
* **Estilos:** Bootstrap 5 & CSS

### Backend
* **Framework:** Django & Django REST Framework
* **Lenguaje:** Python 
* **Autenticación y APIs:** Construcción de endpoints rápidos y seguros para interconectar con el frontend.

### Base de Datos
* **Motor:** MySQL
* **Orm:** Django ORM para la automatización y migraciones.

---

## 📁 Estructura del Proyecto

El repositorio está dividido de manera modular en 3 carpetas principales:

- `📁 backend/`: Código fuente de la API construida en Django.
- `📁 frontend/`: Código fuente de la interfaz desarrollada en Angular.
- `📁 documents/`: Archivos auxiliares como el script de base de datos SQL inicial (`Gestion Total SQL insertions.sql`).

---

## ⚙️ Guía de Instalación y Levantamiento (Local)

Sigue estos pasos en orden para ejecutar todo el ecosistema del proyecto en tu máquina.

### 📋 Prerrequisitos
Asegúrate de contar con lo siguiente instalado en tu sistema:
- [Node.js](https://nodejs.org/) y npm
- [Python 3](https://www.python.org/) y pip
- Un gestor o motor de MySQL (Ej: [TablePlus](https://tableplus.com/))

### Paso 1: Configurar la Base de Datos

1. Abre tu administrador de base de datos (Ej: TablePlus) y asegúrate de que MySQL esté en ejecución.
2. Abre una ventana de consultas SQL (Query editor) y ejecuta exclusivamente:
   ```sql
   CREATE DATABASE gestion_total_app;
   ```
   *(Asegúrate de NO ejecutar todavía el archivo de inserciones SQL que viene en el proyecto).*

### Paso 2: Levantar el Backend (Django)

1. Abre una terminal y dirígete a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Crea e inicia un entorno virtual:
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # (En Bash de Windows) o .\venv\Scripts\activate
   ```
3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Crea el archivo de variables de entorno:
   - Haz una copia del archivo `.env_example` y renómbralo a `.env`.
   - Modifícalo para que coincida con tus credenciales locales de MySQL. Asegúrate de tener `DB_NAME=gestion_total_app`.
5. Construye las tablas de la base de datos:
   ```bash
   python manage.py migrate
   ```
6. Inicializa el servidor backend:
   ```bash
   python manage.py runserver
   ```
   *(Estará disponible en `http://127.0.0.1:8000`)*

### Paso 3: Datos Iniciales 

Con el backend inicializado y las tablas creadas, es momento de insertar los datos iniciales.
1. Vuelve a **TablePlus** .
2. Abre el archivo localizado en la ruta: `documents/Gestion Total SQL insertions.sql`.
3. Ejecuta todo el archivo (Run All). Todas las entidades (clientes, interacciones, etc.) se cargarán exitosamente en la base de datos `gestion_total_app`.

### Paso 4: Levantar el Frontend (Angular)

1. Abre una nueva pestaña de la terminal y dirígete al proyecto de Angular:
   ```bash
   cd frontend/bnan-project
   ```
2. Instala los módulos de Node:
   ```bash
   npm install
   ```
3. Inicializa el servidor de desarrollo:
   ```bash
   npm start
   ```
   *(El frontend estará funcionando en `http://localhost:4200` y consultando la API en tu servidor backend local).*

---

 