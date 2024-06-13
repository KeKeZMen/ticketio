"use client";

import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Dialog,
  DialogContent,
  Input,
  Button,
} from "@shared";
import toast from "react-hot-toast";

type Variant = "LOGIN" | "REGISTER";

export const LoginButton = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleDropdown = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const router = useRouter();

  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      if (variant === "REGISTER") {
        const res = await fetch("/api/auth/register", {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setIsLoading(false);

        if (!res.ok) return toast.error((await res.json()).message);

        await signIn(undefined, {
          redirect: false,
        });
      }

      if (variant === "LOGIN") {
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        setIsLoading(false);

        if (res?.error) return toast.error("Неверный email или пароль");
      }

      handleDropdown();
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error("Ошибка сервера");
    }
  };

  return (
    <>
      <button onClick={handleDropdown}>Войти</button>

      <Dialog open={isOpened} onOpenChange={handleDropdown}>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-3"
            >
              {variant == "REGISTER" ? <h2>Регистрация</h2> : <h2>Войти</h2>}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Почта"
                        type="email"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {variant == "REGISTER" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Имя пользователя</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Имя пользователя"
                          type="text"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Пароль"
                        type="password"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={isLoading}>
                Подтвердить
              </Button>
            </form>

            <div className="flex gap-2 justify-center text-sm mt-3 px-2 text-gray-500">
              <div>
                {variant === "LOGIN" ? "Нет аккаунта?" : "Уже есть аккаунт?"}
              </div>
              <div onClick={toggleVariant} className="underline cursor-pointer">
                {variant === "LOGIN" ? "Создать аккаунт" : "Войти"}
              </div>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
