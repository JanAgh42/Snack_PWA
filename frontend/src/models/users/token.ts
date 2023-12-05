export default interface Token {
  type: 'bearer';
  token: string;
  expires_at?: string;
  expires_in?: number;
}
