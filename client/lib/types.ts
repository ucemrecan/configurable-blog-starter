export interface BlogPost {
  id: string | number;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  image?: string;
  image_url?: string;
}

export interface Profile {
  name: string;
  description: string;
  profileImage: string;
}
