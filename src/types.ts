export interface OperatorProfile {
  code: string;
  rank: string;
  unit: string;
  clearanceLevel: string;
  status: 'ONLINE' | 'ACTIVE_OPS' | 'RESTRICTED';
  terminalId: string;
}

export interface TrainingPhase {
  id: string;
  phaseNumber: string;
  title: string;
  subtitle: string;
  description: string;
  progress: number;
  status: 'COMPLETADO' | 'EN CURSO' | 'BLOQUEADO' | 'DISPONIBLE';
  modulesCount: number;
  duration: string;
  iconName: string;
  tag: string;
  topics: string[];
  bgImageUrl?: string;
}

export interface SituationalProject {
  id: string;
  name: string;
  code: string;
  status: string;
  lastUpdate: string;
  metrics: {
    contraband: {
      title: string;
      percentage: number;
      interdictions: number;
      efficiency: string;
      status: string;
    };
    borderPosts: {
      title: string;
      percentage: number;
      activePosts: number;
      totalPosts: number;
      status: string;
    };
    illegalRoutes: {
      title: string;
      percentage: number;
      vectorsTracked: number;
      riskLevel: string;
      status: string;
    };
  };
}
