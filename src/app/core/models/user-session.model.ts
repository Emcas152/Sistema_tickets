export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: 'cliente' | 'admin' | 'organizador';
}

export interface UserSession {
  token: string;
  user: SessionUser;
}
