import { ContentItem } from '@/types';

export const mockContent: ContentItem[] = [
  {
    id: 1,
    title: 'AI Interview Prep for Product Managers',
    category: 'Career Advice',
    author: 'Emma Chen',
    updatedAt: '2026-09-20T10:15:00Z',
    status: 'In Review',
    summary:
      'A practical guide on how PM candidates can structure interview answers for product strategy and execution.',
    body:
      'This article walks through mock interview scenarios, stakeholder management examples, and the tradeoff frameworks useful in product leadership evaluations.',
  },
  {
    id: 2,
    title: 'The Future of Team Communication',
    category: 'Workplace',
    author: 'Daniel Ortiz',
    updatedAt: '2026-09-18T09:00:00Z',
    status: 'Draft',
    summary:
      'Why async collaboration and structured updates matter for distributed teams working across time zones.',
    body:
      'Teams that document decisions and define communication norms are more resilient, especially when they scale across multiple regions and functions.',
  },
  {
    id: 3,
    title: 'Designing Better Knowledge Bases',
    category: 'Product',
    author: 'Sofia Patel',
    updatedAt: '2026-09-22T14:30:00Z',
    status: 'Approved',
    summary:
      'A breakdown of the principles behind intuitive internal documentation and easier retrieval for teams.',
    body:
      'Good knowledge bases reduce context switching, improve onboarding, and ensure teams can find actionable answers without repeated meetings.',
  },
  {
    id: 4,
    title: 'Customer Retention Metrics That Matter',
    category: 'Analytics',
    author: 'Luca Nguyen',
    updatedAt: '2026-09-17T08:45:00Z',
    status: 'Rejected',
    summary:
      'How to measure retention without over-indexing vanity metrics that don’t translate to product value.',
    body:
      'Teams should focus on retention quality, onboarding friction, and repeat engagement loops rather than one-off campaign metrics.',
  },
  {
    id: 5,
    title: 'Remote Leadership Playbook',
    category: 'Leadership',
    author: 'Priya Shah',
    updatedAt: '2026-09-24T16:10:00Z',
    status: 'In Review',
    summary:
      'Strategies for managing feedback loops, team rituals, and decision quality when working remotely.',
    body:
      'Strong remote leaders create predictability, document decisions, and coach proactively so the team can maintain momentum with less friction.',
  },
];
