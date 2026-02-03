// src/app/pages/home-page/home-page.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

type Highlight = {
  day: string;
  date: string;
  title: string;
  items: string[];
};

type Benefit = {
  icon: string;
  title: string;
  desc: string;
};

@Component({
  standalone: true,
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class MainLayoutComponent {
  theme = 'Fiscalité & Prix de Transfert';
  dates = '02–05 Mars 2026';

  benefits: Benefit[] = [
    {
      icon: 'school',
      title: 'Apprentissage',
      desc: 'Loi de finances 2026, fiscalité locale, prix de transfert et pratiques terrain avec des experts.',
    },
    {
      icon: 'groups',
      title: 'Réseautage',
      desc: 'Rencontres avec juristes, fiscalistes, cabinets, institutions et acteurs économiques.',
    },
    {
      icon: 'workspace_premium',
      title: 'Opportunités',
      desc: 'Stages, immersion pro, échanges directs et visibilité auprès de structures partenaires.',
    },
  ];

  highlights: Highlight[] = [
    {
      day: 'Jour 1',
      date: '03 Mars 2026',
      title: 'Ouverture & Table ronde',
      items: [
        'Cérémonie officielle d’ouverture (ruban symbolique)',
        'Table ronde : Fiscalité et prix de transfert',
      ],
    },
    {
      day: 'Jour 2',
      date: '04 Mars 2026',
      title: 'Séminaire & Clinique juridique',
      items: [
        'Séminaire sur la loi de finances 2026 (WALT)',
        'Foire des métiers (débouchés)',
        'Clinique juridique ouverte au public',
      ],
    },
    {
      day: 'Jour 3',
      date: '05 Mars 2026',
      title: 'Simulation & Clôture',
      items: [
        'Procès fictif & formation arbitrale',
        'Cercle des experts (thématique libre)',
        'Cérémonie de clôture + Awards/Quiz',
      ],
    },
  ];

  partners = [
    'Orange Cameroun',
    'OHADA',
    'FEICOM',
  ];

  contactEmail = 'taxandlegaldays2026@gmail.com';
  contactPhone = '+237 650 09 38 61';
}
