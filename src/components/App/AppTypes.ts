// interface of photos we get from backend

export default interface ImageI {
  url: string;
  id: number;
  [key: string]: any;
}
