import { useLogin } from "@/hooks/useLogin";
import { useTogglePassword } from "@/hooks/useTogglePassword";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  LogIn,
  User,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { HARDCODED_USER } from "@/lib/auth";

export default function LoginPage() {
  const { form, onSubmit, isLoading } = useLogin();
  const { showPassword, togglePasswordVisibility, passwordType } =
    useTogglePassword();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <Card className="w-full max-w-md border shadow-lg relative backdrop-blur-sm bg-card/95">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            Welcome!
          </CardTitle>
          <CardDescription className="text-center text-base">
            Please sign in to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Username
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your username"
                          className="h-12 pl-4 pr-4 text-base"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={passwordType}
                          placeholder="Enter your password"
                          className="h-12 pl-4 pr-12 text-base"
                          disabled={isLoading}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          disabled={isLoading}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                          {showPassword ? (
                            <Eye className="w-5 h-5" />
                          ) : (
                            <EyeOff className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold relative overflow-hidden group cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                    Login
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Demo Account
              </p>
              <p className="text-sm font-semibold text-foreground text-center mt-2">
                <span>Username : {HARDCODED_USER.userName}</span> -{" "}
                <span>Password : {HARDCODED_USER.password}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
