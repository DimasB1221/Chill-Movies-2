import signUpNewUser from "@/src/services/auth/registerServices";

const handleSubmitRegister = async (prevState: string, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password || !confirmPassword) {
    return "Error: Semua field harus diisi";
  }

  if (password !== confirmPassword) {
    return "Error: Kata sandi tidak cocok";
  }

  // Props di destructuring terlebih dahulu dan di kirim ke RegisterServices
  const result = await signUpNewUser({ email, password });

  if (result?.success) {
    // Redirect ke login setelah register berhasil
    window.location.href = "/login";
    return "Registrasi berhasil! Silakan login...";
  }

  return result?.error || "Error: Kesalahan terjadi silahkan ulangi";
};

export default handleSubmitRegister;
