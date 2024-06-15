import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // create mutation

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("api call success");
      navigate("/home");
    },
  });

  const handleSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      return alert("Please fill all the details");
    }

    loginMutation.mutate({ email, password });

    console.log(email, password);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
          {loginMutation.isError && (
            <>
              <CardDescription className="text-red-500 text-sm">
                {loginMutation.error.message}
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={passwordRef} id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending && (
              <div className="animate-spin mr-2">
                <LoaderCircle />
              </div>
            )}
            Sign in
          </Button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/auth/register"} className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
