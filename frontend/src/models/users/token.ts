export default interface Token {
  type: 'bearer';
  content: string;
  expires_at?: string;
  expires_in?: number;
}
