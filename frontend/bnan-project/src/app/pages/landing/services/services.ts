import { Component } from '@angular/core';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {
  services: Service[] = [
    {
      icon: 'bi-search',
      title: 'SEO y SEM',
      description: 'Optimización en motores de búsqueda y campañas de publicidad pagada para maximizar tu visibilidad online.',
    },
    {
      icon: 'bi-share',
      title: 'Social Media',
      description: 'Gestión profesional de redes sociales con contenido atractivo que conecta con tu audiencia.',
    },
    {
      icon: 'bi-megaphone',
      title: 'Publicidad Digital',
      description: 'Campañas publicitarias estratégicas en Google Ads, Facebook Ads y más plataformas.',
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Growth Marketing',
      description: 'Estrategias de crecimiento basadas en datos para escalar tu negocio de forma sostenible.',
    },
    {
      icon: 'bi-envelope',
      title: 'Email Marketing',
      description: 'Campañas de email personalizadas que convierten suscriptores en clientes fieles.',
    },
    {
      icon: 'bi-bar-chart',
      title: 'Analítica Web',
      description: 'Análisis profundo de datos para tomar decisiones informadas y optimizar resultados.',
    },
  ];
}
