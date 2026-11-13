import type { PlateVariant } from '../components/common/VisualPlate';

export interface Program {
  id: string;
  title: string;
  tag: string;
  summary: string;
  focus: string[];
  art: PlateVariant;
}

export const programs: Program[] = [
  {
    id: 'running',
    title: 'Running Practice',
    tag: 'Track',
    summary:
      'Sprint mechanics, stride rhythm and repeat efforts on the track — the base layer for every other discipline.',
    focus: ['Sprint mechanics', 'Stride and rhythm', 'Repeat efforts', 'Warm-up and cool-down discipline'],
    art: 'track',
  },
  {
    id: 'high-jump',
    title: 'High Jump',
    tag: 'Field',
    summary:
      'Approach runs, take-off timing and bar clearance work, practised in sequence rather than in isolation.',
    focus: ['Approach rhythm', 'Take-off timing', 'Bar clearance', 'Landing technique'],
    art: 'highjump',
  },
  {
    id: 'physical-fitness',
    title: 'Physical Fitness',
    tag: 'Conditioning',
    summary:
      'General conditioning that builds strength, mobility and stamina without skipping the fundamentals.',
    focus: ['Strength basics', 'Mobility', 'Endurance', 'Recovery habits'],
    art: 'drills',
  },
  {
    id: 'army-physical',
    title: 'Army Physical Preparation',
    tag: 'Preparation',
    summary:
      'Physical preparation for defence-style selection routines: running volume, strength work and sustained effort.',
    focus: ['Running volume', 'Bodyweight strength', 'Sustained effort', 'Consistency under load'],
    art: 'nightrun',
  },
  {
    id: 'sports-training',
    title: 'Sports Training',
    tag: 'General',
    summary:
      'Sport-oriented training sessions for athletes who want structured practice and a coach-led environment.',
    focus: ['Athletic movement', 'Speed and agility', 'Session structure', 'Training discipline'],
    art: 'stands',
  },
];

export function findProgram(id: string): Program | undefined {
  return programs.find((program) => program.id === id);
}
