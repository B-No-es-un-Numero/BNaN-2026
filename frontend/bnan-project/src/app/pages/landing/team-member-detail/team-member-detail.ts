import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/navbar/navbar';
import { Footer } from '../../../shared/footer/footer';


@Component({
  selector: 'app-team-member-detail',
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './team-member-detail.html',
  styleUrl: './team-member-detail.css',
})
export class TeamMemberDetail {

  private route = inject(ActivatedRoute);

  member: any;

  teamMembers = [
    {
      id: 1,
      name: 'Melina Bruvera',
      role: 'CEO & Fundadora',
      avatar: '👩‍💼',
      bio: 'Con más de 15 años de experiencia en marketing digital y estrategia comercial, Melina lidera la visión del proyecto enfocándose en la innovación, el crecimiento y la conexión entre tecnología y negocios. Su enfoque estratégico impulsa soluciones orientadas a optimizar la relación entre empresas y clientes.',
      specialties: [
        'Estrategia digital',
        'Liderazgo de equipos',
        'Growth Marketing',
        'Gestión de proyectos',
        'Branding empresarial'
      ],
      tools: [
        'Meta Ads',
        'Google Analytics',
        'Trello',
        'Figma'
      ],
      email: 'melina@bnan.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    {
      id: 2,
      name: 'Guillermo Divan',
      role: 'Director de Marketing',
      avatar: '👨‍💻',
      bio: 'Especialista en marketing digital y growth hacking, Guillermo se enfoca en desarrollar estrategias orientadas a resultados y optimización de procesos. Su experiencia combina análisis de métricas, automatización y posicionamiento digital para potenciar el crecimiento de marcas y productos tecnológicos.',
      specialties: [
        'Growth Hacking',
        'SEO & SEM',
        'Automatización',
        'Estrategias de conversión',
        'Performance marketing',
      ],
      tools: [
        'Google Ads',
        'SEMrush',
        'Google Tag Manager',
        'Canva'
      ],
      email: 'guillermo@bnan.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    {
      id: 3,
      name: 'Gabriel Natale',
      role: 'Frontend Developer',
      avatar: '👩‍💻',
      bio: 'Desarrollador frontend apasionado por la creación de interfaces modernas, intuitivas y responsivas. Gabriel trabaja en la experiencia visual y funcional del sistema, priorizando accesibilidad, usabilidad y diseño centrado en el usuario.',
      specialties: [
        'Desarrollo Frontend',
        'UI/UX',
        'Responsive Design',
        'Optimización visual'
      ],
      tools: [
        'Angular',
        'TypeScript',
        'Bootstrap',
        'GitHub'
      ],
      email: 'gabriel@bnan.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    {
      id: 4,
      name: 'David Pardo',
      role: 'Director Creativo',
      avatar: '👨‍🎨',
      bio: 'Diseñador gráfico y estratega creativo enfocado en construir identidades visuales modernas y experiencias digitales atractivas. David combina creatividad y comunicación visual para fortalecer la imagen del proyecto y mejorar la interacción con los usuarios.',
      specialties: [
        'Diseño gráfico',
        'Branding',
        'Diseño UX/UI',
        'Creatividad publicitaria',
        'Identidad visual'
      ],
      tools: [
        'Adobe Photoshop',
        'Illustrator',
        'Canva',
        'Figma',
        'After Effects'
      ],
      email: 'david@bnan.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    {
      id: 5,
      name: 'Joaquin Romero',
      role: 'Innovación Tech',
      avatar: '🧑‍🚀',
      bio: 'Apasionado por la tecnología y la innovación, Joaquín investiga e implementa herramientas modernas orientadas a resolver problemas reales mediante soluciones eficientes y escalables. Su enfoque está centrado en la mejora continua y la exploración de nuevas tecnologías.',
      specialties: [
        'Innovacion Tecnologica',
        'Investigación IT',
        'Arquitectura de soluciones',
        'Automatización',
        'Escalabilidad'
      ],
      tools: [
        'Python',
        'MySQL',
        'Git',
        'Postman'
      ],
      email: 'joaquin@bnan.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    }
  ];

  ngOnInit() {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.member = this.teamMembers.find(
      member => member.id === id
    );

    console.log(this.member);
  }
}