export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  image?: string;
}

export interface Profile {
  name: string;
  description: string;
  profileImage: string;
}
