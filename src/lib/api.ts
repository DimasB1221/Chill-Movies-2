import axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

// Ambil URL dan Anon Key dari environment variable
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validasi environment variable
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL atau Anon Key belum disetting di environment variable (.env)",
  );
}

const api: AxiosInstance = axios.create({
  baseURL: `${supabaseUrl}/rest/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Pastikan headers ada
    config.headers = config.headers || {};

    // Tambahkan header autentikasi Supabase
    config.headers["apikey"] = supabaseAnonKey;
    config.headers["Authorization"] = `Bearer ${supabaseAnonKey}`;

    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error codes if needed
    if (error.response?.status === 500) {
      console.error("Gagal fetch data - Internal Server Error");
      console.log(error.response?.data);
    }
    return Promise.reject(error);
  },
);

export default api;
