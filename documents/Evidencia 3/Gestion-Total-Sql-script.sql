CREATE DATABASE IF NOT EXISTS gestion_total_app
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE gestion_total_app;

CREATE TABLE `user_app_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(150) NOT NULL,
  `role` varchar(50) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `company_app_company` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `cuil` varchar(20) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cuil` (`cuil`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `client_app_client` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `company_id` bigint DEFAULT NULL,
  `responsible_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `dni` (`dni`),
  KEY `client_app_client_company_id_c1869584_fk_company_app_company_id` (`company_id`),
  KEY `client_app_client_responsible_user_id_b77c8d94_fk` (`responsible_user_id`),
  CONSTRAINT `client_app_client_company_id_c1869584_fk_company_app_company_id` FOREIGN KEY (`company_id`) REFERENCES `company_app_company` (`id`),
  CONSTRAINT `client_app_client_responsible_user_id_b77c8d94_fk` FOREIGN KEY (`responsible_user_id`) REFERENCES `user_app_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `task_app_task` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` longtext,
  `due_date` date DEFAULT NULL,
  `status` varchar(15) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `assigned_user_id` bigint NOT NULL,
  `client_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `task_app_task_client_id_1f1fd5b1_fk_client_app_client_id` (`client_id`),
  KEY `task_app_task_assigned_user_id_e300523b_fk` (`assigned_user_id`),
  CONSTRAINT `task_app_task_assigned_user_id_e300523b_fk` FOREIGN KEY (`assigned_user_id`) REFERENCES `user_app_user` (`id`),
  CONSTRAINT `task_app_task_client_id_1f1fd5b1_fk_client_app_client_id` FOREIGN KEY (`client_id`) REFERENCES `client_app_client` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/* INSERTIONS */
/* USER */
INSERT INTO `user_app_user`
(
    `id`,
    `password`,
    `last_login`,
    `is_superuser`,
    `is_staff`,
    `is_active`,
    `username`,
    `first_name`,
    `last_name`,
    `email`,
    `role`,
    `enabled`,
    `date_joined`,
    `created_at`,
    `updated_at`
)
VALUES

(1, 'pbkdf2_sha256$1000000$hash01', NULL, 1,1,1, 'admin01','Name','Surname','admin01@gestiontotal.com','admin',1,'2026-01-03 08:00:00.000000','2026-01-03 08:00:00.000000','2026-04-02 09:20:00.000000'),

(2, 'pbkdf2_sha256$1000000$hash02', NULL, 1,1,1, 'admin02','Name','Surname','admin02@gestiontotal.com','admin',1,'2026-01-03 08:00:00.000000','2026-01-06 09:10:00.000000','2026-04-03 11:40:00.000000'),

(3, 'pbkdf2_sha256$1000000$hash03', NULL, 1,1,1, 'user01','Name','Surname','user01@gestiontotal.com','user',1,'2026-01-03 08:00:00.000000','2026-01-10 10:30:00.000000','2026-04-04 14:00:00.000000'),

(4, 'pbkdf2_sha256$1000000$hash04', NULL, 1,1,1, 'user02','Name','Surname','user02@gestiontotal.com','user',1,'2026-01-03 08:00:00.000000','2026-01-12 12:00:00.000000','2026-04-05 16:15:00.000000'),

(5, 'pbkdf2_sha256$1000000$hash05', NULL, 1,1,1, 'user03','Name','Surname','user03@gestiontotal.com','user',1,'2026-01-03 08:00:00.000000','2026-01-15 11:15:00.000000','2026-04-07 09:50:00.000000'),

(6, 'pbkdf2_sha256$1000000$hash06', NULL, 1,1,1, 'user04','Name','Surname','user04@gestiontotal.com','user',1,'2026-01-03 08:00:00.000000','2026-01-18 15:40:00.000000','2026-04-08 13:20:00.000000'),

(7, 'pbkdf2_sha256$1000000$hash07', NULL, 1,1,1, 'user05','Name','Surname','user05@gestiontotal.com','user',1,'2026-01-03 08:00:00.000000','2026-01-22 08:25:00.000000','2026-04-10 10:45:00.000000'),

(8, 'pbkdf2_sha256$1000000$hash08', NULL, 1,1,1, 'user06','Name','Surname','user06@gestiontotal.com','user',1,'2026-01-03 08:00:00.000000','2026-02-01 09:00:00.000000','2026-04-12 15:30:00.000000');

/* COMPANY */
INSERT INTO `company_app_company`
(`id`,`name`,`cuil`,`phone`,`email`,`enabled`,`created_at`,`updated_at`)
VALUES
(1,'Arcor SAIC','30-50279308-1','3514201001','contacto@arcor.com',1,'2026-01-05 09:15:00.000000','2026-04-02 11:40:00.000000'),
(2,'Mercado Libre SRL','30-70308853-4','3514201002','marketing@mercadolibre.com',1,'2026-01-08 10:20:00.000000','2026-04-03 14:10:00.000000'),
(3,'Globant SA','30-70821335-7','3514201003','corporativo@globant.com',1,'2026-01-12 13:05:00.000000','2026-04-04 10:00:00.000000'),
(4,'YPF SA','30-54668997-9','3514201004','clientes@ypf.com',1,'2026-01-15 15:40:00.000000','2026-04-05 16:30:00.000000'),
(5,'Personal Flow','30-64145357-6','3514201005','contacto@personal.com.ar',1,'2026-01-18 11:25:00.000000','2026-04-07 09:50:00.000000'),
(6,'Banco Galicia','30-50000173-3','3514201006','marketing@bancogalicia.com.ar',1,'2026-01-22 08:45:00.000000','2026-04-08 13:15:00.000000'),
(7,'Despegar.com','30-69284574-1','3514201007','prensa@despegar.com',1,'2026-02-01 14:10:00.000000','2026-04-10 12:20:00.000000'),
(8,'Coca-Cola FEMSA Argentina','30-70712865-8','3514201008','contacto@cocacola.com.ar',1,'2026-02-05 09:30:00.000000','2026-04-12 15:40:00.000000'),
(9,'Mastellone Hnos SA','30-54712456-0','3514201009','info@mastellone.com.ar',1,'2026-02-10 16:00:00.000000','2026-04-15 10:35:00.000000'),
(10,'Grupo Clarin','30-50612418-2','3514201010','corporativo@clarin.com',1,'2026-02-15 10:50:00.000000','2026-04-18 17:10:00.000000');

/* CLIENT */
INSERT INTO `client_app_client`
(
`id`,`name`,`email`,`dni`,`date_of_birth`,`phone`,`status`,
`company_id`,`responsible_user_id`,`enabled`,`created_at`,`updated_at`
)
VALUES

(1,'Carlos Ramirez','carlos.ramirez@gmail.com','30111222','1990-03-12','3515101001','lead',1,3,1,'2026-01-05 10:00:00.000000','2026-04-02 11:00:00.000000'),
(2,'Lucia Torres','lucia.torres@gmail.com','30111223','1988-07-25','3515101002','active',2,4,1,'2026-01-08 09:30:00.000000','2026-04-03 14:20:00.000000'),
(3,'Martin Suarez','martin.suarez@gmail.com','30111224','1992-09-14','3515101003','closed',3,5,1,'2026-01-12 11:40:00.000000','2026-04-04 10:30:00.000000'),
(4,'Valeria Gomez','valeria.gomez@gmail.com','30111225','1989-11-08','3515101004','active',4,1,1,'2026-01-15 13:20:00.000000','2026-04-05 15:40:00.000000'),
(5,'Nicolas Acosta','nicolas.acosta@gmail.com','30111226','1995-01-18','3515101005','lead',5,3,1,'2026-01-18 16:10:00.000000','2026-04-07 09:15:00.000000'),
(6,'Camila Diaz','camila.diaz@gmail.com','30111227','1993-04-30','3515101006','active',6,4,1,'2026-01-22 10:30:00.000000','2026-04-08 12:10:00.000000'),
(7,'Fernando Luna','fernando.luna@gmail.com','30111228','1987-06-11','3515101007','closed',7,5,1,'2026-02-01 08:40:00.000000','2026-04-10 11:50:00.000000'),
(8,'Agustina Vega','agustina.vega@gmail.com','30111229','1996-10-05','3515101008','active',8,1,1,'2026-02-05 09:50:00.000000','2026-04-12 14:40:00.000000'),
(9,'Sebastian Rios','sebastian.rios@gmail.com','30111230','1991-02-20','3515101009','lead',9,3,1,'2026-02-10 15:15:00.000000','2026-04-15 10:10:00.000000'),
(10,'Florencia Medina','florencia.medina@gmail.com','30111231','1994-12-09','3515101010','active',10,4,1,'2026-02-15 11:00:00.000000','2026-04-18 16:20:00.000000');

/* TASK */
INSERT INTO `task_app_task`
(
`id`,`title`,`description`,`due_date`,`status`,
`assigned_user_id`,`client_id`,`enabled`,`created_at`,`updated_at`
)
VALUES

(1,'Campaña Arcor','...','2026-05-10','pending',3,1,1,'2026-01-06 09:40:00.000000','2026-04-02 11:20:00.000000'),
(2,'Campaña Mercado Libre','...','2026-05-14','in_progress',4,2,1,'2026-01-10 12:10:00.000000','2026-04-03 14:50:00.000000'),
(3,'Campaña Globant','...','2026-05-18','done',5,3,1,'2026-01-12 14:30:00.000000','2026-04-04 10:45:00.000000'),
(4,'Campaña YPF','...','2026-05-22','in_progress',1,4,1,'2026-01-16 11:20:00.000000','2026-04-05 16:00:00.000000'),
(5,'Campaña Personal Flow','...','2026-05-25','cancelled',3,5,1,'2026-01-20 10:40:00.000000','2026-04-07 09:40:00.000000'),
(6,'Campaña Banco Galicia','...','2026-05-28','pending',4,6,1,'2026-01-24 13:50:00.000000','2026-04-08 12:45:00.000000'),
(7,'Relevamiento Despegar','...','2026-06-02','done',5,7,1,'2026-02-02 09:10:00.000000','2026-04-10 12:15:00.000000'),
(8,'Relevamiento Coca Cola','...','2026-06-05','in_progress',1,8,1,'2026-02-06 11:30:00.000000','2026-04-12 15:00:00.000000'),
(9,'Relevamiento Mastellone','...','2026-06-10','pending',3,9,1,'2026-02-10 14:00:00.000000','2026-04-15 10:40:00.000000'),
(10,'Relevamiento Clarin','...','2026-06-14','done',4,10,1,'2026-02-14 10:20:00.000000','2026-04-18 16:40:00.000000');