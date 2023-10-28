"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInApi, signUpApi } from "@/lib/utils/api";

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleClear = () => {
    setEmail("");
    setName("");
    setPassowrd("");
    setConfirmPassword("");
  };
  const handleSignIn = async () => {
    // handle sign in
    try {
      const {
        user: { id },
      } = await signInApi({ email, password });
      toast({
        title: "Success",
        description: "Sign in successful",
      });
      localStorage.setItem("userId", id);
      router.push("/todos");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return;
    }
  };
  const handleSignUp = async () => {
    // handle sign up
    if (password !== confirmPassword) {
      // show error
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }
    try {
      const {
        user: { id },
      } = await signUpApi({ email, name, password });
      localStorage.setItem("userId", id);
      toast({
        title: "Success",
        description: "Sign up successful",
      });
      router.push("/todos");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign up",
        variant: "destructive",
      });
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignIn) {
      // handle sign in
      await handleSignIn();
    } else {
      // handle sign up
      await handleSignUp();
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader></CardHeader>
        <CardContent className="flex w-[400px] flex-col gap-4">
          <Tabs
            defaultValue="signin"
            className="w-full"
            onValueChange={(value) => {
              setIsSignIn(value === "signin");
            }}
          >
            <TabsList className="w-full">
              <TabsTrigger value="signin" className="w-full">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="w-full">
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {!isSignIn && (
            <Input
              placeholder="Your name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassowrd(e.target.value);
            }}
          />
          {!isSignIn && (
            <Input
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          )}
        </CardContent>
        <CardFooter className="flex w-full justify-end gap-2">
          <Button onClick={handleClear} variant={"outline"}>
            Clear
          </Button>
          <Button type="submit">{isSignIn ? "Sign In" : "Sign Up"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
