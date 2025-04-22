import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Sinner {
  id: string;
  name: string;
  rarity: number;
  sin: string;
  damage: string;
  image: string;
}

export interface EGO {
  id: string;
  name: string;
  category: string;
  sin: string;
  damage: string;
  characterId: string;
  sinner_id?: string;
  character?: Sinner;
  image: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  sinners: Sinner[];
  egos: EGO[];
  user: string;
  createdAt: string;
  updatedAt: string;
}

export const getSinners = async (): Promise<Sinner[]> => {
  const response = await api.get<Sinner[]>('/sinners');
  return response.data;
};

export const getEgos = async (): Promise<EGO[]> => {
  const response = await api.get<EGO[]>('/egos');
  return response.data;
};

export const getEgosByCategory = async (category: string): Promise<EGO[]> => {
  const response = await api.get<EGO[]>(`/egos/category/${category}`);
  return response.data;
};

export const getTeams = async (): Promise<Team[]> => {
  const response = await api.get<Team[]>('/teams');
  return response.data;
};

export const createTeam = async (teamData: {
  name: string;
  description: string;
  characters: string[];
  egos: Array<{
    egoId: string;
    sinnerId: string;
  }>;
}): Promise<Team> => {
  const response = await api.post<Team>('/teams', teamData);
  return response.data;
};

export const updateTeam = async (id: string, teamData: {
  name?: string;
  description?: string;
  characters?: string[];
  egos?: string[];
}): Promise<Team> => {
  const response = await api.put<Team>(`/teams/${id}`, teamData);
  return response.data;
};

export const deleteTeam = async (id: number): Promise<void> => {
  await api.delete(`/teams/${id}`);
}; 