import signInNewUser from "@/src/services/auth/loginServices";
import { redirect } from "next/navigation";

const handleSubmitLogin = async (prevState: string, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!password || !email) {
    return "Error: Email atau kata sandi salah";
  }

  // Props di destructuring terlebih dahulu dan di kirim ke LoginServices
  const result = await signInNewUser({ email, password });

  if (result?.success) {
    // Redirect ke homepage setelah login berhasil
    redirect("/");
  }

  return result?.error || "Error: Kesalahan terjadi silahkan ulangi";
};

export default handleSubmitLogin;
