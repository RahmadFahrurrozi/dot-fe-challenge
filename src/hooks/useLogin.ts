import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, getUser } from "@/lib/auth";
import { toast } from "sonner";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "At least 3 characters long"),
  password: z.string().min(1, "Password is required"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  useEffect(() => {
    const user = getUser();
    if (user) navigate("/");
  }, [navigate]);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = login({ userName: data.username, password: data.password });
    if (result.ok) {
      navigate("/");
      toast.success("Login successful");
      setIsLoading(false);
    } else {
      form.setError("username", { message: result.message });
      form.setError("password", { message: result.message });
      toast.error(result.message);
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};
