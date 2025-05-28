export const load = async ({ cookies }) => {
  cookies.delete("placemark-user", { path: "/" });
};
