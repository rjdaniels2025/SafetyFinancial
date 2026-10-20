/**
 * Team members shown on the About page. The "Our team" section stays hidden
 * until at least one verified entry is added here.
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  credentials?: string; // verified designations or licences only
  photo?: string; // e.g. '/images/team/jane.jpg'
}

export const team: TeamMember[] = [];
