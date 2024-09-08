export interface Participant {
    id: number;
    name: string;
    role: 'judge' | 'representative' | 'participant';
    isMuted: boolean;
  }
  