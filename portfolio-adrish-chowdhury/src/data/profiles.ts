export type SectionId = 'story' | 'skills' | 'projects' | 'journey' | 'experience'
export interface Persona { id: string; name: string; blurb: string; hero: string; color: string; icon: 'briefcase' | 'code' | 'palette' | 'compass'; order: SectionId[] }
// "order" decides which sections appear first after the hero for each viewer type.
export const personas: Persona[] = [
  { id: 'recruiter', name: 'Recruiter', blurb: 'Career highlights, education and the full story.', hero: 'Recruiter mode: experience, credentials and resume first', color: '#e50932', icon: 'briefcase', order: ['story', 'experience', 'skills', 'projects', 'journey'] },
  { id: 'developer', name: 'Developer', blurb: 'Skills, projects and the technical journey.', hero: 'Developer mode: stack, projects and architecture first', color: '#2d9cdb', icon: 'code', order: ['skills', 'projects', 'journey', 'experience', 'story'] },
  { id: 'creative', name: 'Creative', blurb: 'Projects and visual work first.', hero: 'Creative mode: projects and visual work first', color: '#27ae60', icon: 'palette', order: ['projects', 'journey', 'story', 'skills', 'experience'] },
  { id: 'explorer', name: 'Explorer', blurb: 'The personal journey and what is next.', hero: 'Explorer mode: the personal journey first', color: '#f2a900', icon: 'compass', order: ['journey', 'story', 'projects', 'skills', 'experience'] },
]
