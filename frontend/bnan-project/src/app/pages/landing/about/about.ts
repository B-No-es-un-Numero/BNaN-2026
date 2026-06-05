import { Component } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { Footer } from '../../../shared/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {  equipo = [
    { id: 1, nombre: 'Melina Bruvera', puesto: 'CEO & Fundadora', bio: 'Experta en marketing de negocios con mas de 15 años de experiencia en marketing digital.', emoji: '👩‍💼' },
    { id: 2, nombre: 'Guillermo Divan', puesto: 'Director de Marketing', bio: 'Especialista en marketing digital y growth hacking con resultados comprobados.', emoji: '👨‍💻' },
    { id: 3, nombre: 'Gabriel Natale', puesto: 'Frontend Developer', bio: 'Especialista en interfaces modernas y experiencia de usuario.', emoji: '👨‍💻' },
    { id: 4, nombre: 'David Pardo', puesto: 'Director Creativo', bio: 'Diseñador gráfico y estratega de marca con pasión por la creatividad innovadora.', emoji: '👨‍🎨' },
    { id: 5, nombre: 'Joaquin Romero', puesto: 'Innovación Tech', bio: 'Especialista en buscar y aplicar tecnologías modernas para resolver problemas reales.', emoji: '🧑‍🚀' }
  ];

  valores = [
  {
    titulo: 'Misión',
    descripcion: 'Brindar soluciones integrales de marketing digital que impulsen el crecimiento real y sostenible de nuestros clientes, combinando creatividad con datos.',
    icon: 'bi-rocket-takeoff'
  },
  {
    titulo: 'Propósito',
    descripcion: 'Transformar la presencia digital de las empresas para que conecten de manera humana y efectiva con su audiencia, rompiendo las barreras del mercado.',
    icon: 'bi-lightbulb'
  }
];}
