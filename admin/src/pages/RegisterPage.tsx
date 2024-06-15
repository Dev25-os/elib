import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/http/api";
import { useTokenStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  // create mutation

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      console.log("api call success");
      setToken(response?.data?.accessToken);
      navigate("/home");
    },
  });

  const handleSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    if (!name || !email || !password) {
      return alert("Please fill all the details");
    }

    registerMutation.mutate({ name, email, password });

    console.log(email, password);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
          {registerMutation.isError && (
            <>
              <CardDescription className="text-red-500 text-sm">
                {registerMutation.error.message}
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  ref={nameRef}
                  id="name"
                  placeholder="Max"
                  type="text"
                  required
                />
              </div>
            </div>
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
              <Input ref={passwordRef} id="password" type="password" />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending && (
                <div className="animate-spin mr-2">
                  <LoaderCircle />
                </div>
              )}
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
