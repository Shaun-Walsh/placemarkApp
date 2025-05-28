import { placemarkService } from "$lib/services/placemark-service";
import { redirect } from "@sveltejs/kit";
import { dev } from "$app/environment";

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    
    if (email === "" || password === "") {
      throw redirect(307, "/");
    } else {
      console.log(`attempting to log in email: ${email} with password: ${password}`);
      const session = await placemarkService.login(email, password);

      if (session) {
        const completeSession = {
          email: session.email,
          name: session.name,
          token: session.token,
          _id: session._id
        };
        
        
        const userJson = JSON.stringify(completeSession);
        cookies.set("placemark-user", userJson, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: !dev,
          maxAge: 60 * 60 * 24 * 7
        });
        throw redirect(303, "/add");
      } else {
        throw redirect(307, "/");
      }
    }
  }
};