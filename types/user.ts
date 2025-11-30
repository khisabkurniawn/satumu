export type AppUser = {
  user: {
    email: string | null;
  };
  profile: {
    full_name: string | null;
    role: string | null;
    avatar_url: string | null;
  };
};
