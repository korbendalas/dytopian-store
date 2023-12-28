"use client";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import {FormInput} from "@/components/UI/atoms/FormInput";
import { LoadingButton } from "@/components/UI/atoms/LoadingButton";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { signUpUserFn } from "@/api/authApi";
import {useAuthStore} from "@/store";
import { useMutation } from "@tanstack/react-query";
import {Message} from "@/components/UI/atoms/Message";

export type RegisterInput = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
};

export const RegisterPage = () => {
    const store = useAuthStore();

    const methods = useForm<RegisterInput>();
    console.log(store, methods)
    // debugger;
    // ? Calling the Register Mutation
    const {
        mutate: registerUser,
        data,
        isSuccess,
    } = useMutation(
        {
        mutationFn: signUpUserFn,
        onMutate(variables) {
            store.setRequestLoading(true);
        },
        onSuccess(data) {
            store.setRequestLoading(false);
            toast.success(data?.message);
        },
        onError(error: any) {
            store.setRequestLoading(false);
            if (Array.isArray((error as any).response.data.error)) {
                (error as any).response.data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: "top-right",
                    })
                );
            } else {
                toast.error((error as any).response.data.message, {
                    position: "top-right",
                });
            }
        },
    });
    console.log(data);
    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        // ? Execute the Mutation
        registerUser(values);
    };

    return (
        <section className="py-8 bg-ct-blue-600 min-h-screen grid place-items-center">
            {data && isSuccess ? (
                <Message>
                    <p className="text-xl">{data.message}</p>
                    <p className="mt-8">
                        Already confirmed? Then you can{" "}
                        <Link to="/login" className="text-blue-700 underline">
                            Log in
                        </Link>
                    </p>
                </Message>
            ) : (
                <div className="w-full">
                    <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
                        Welcome to CodevoWeb!
                    </h1>
                    <h2 className="text-lg text-center mb-4 text-ct-dark-200">
                        Sign Up To Get Started!
                    </h2>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(onSubmitHandler)}
                            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
                        >
                            <FormInput label="First Name" name="firstName" />
                            <FormInput label="Last Name" name="lastName" />
                            <FormInput label="Email" name="email" type="email" />
                            <FormInput label="Password" name="password" type="password" />
                            <FormInput label="Username" name="username"  />
                            <FormInput
                                label="Confirm Password"
                                name="passwordConfirm"
                                type="password"
                            />
                            <span className="block">
                Already have an account?{" "}
                                <Link to="/signin" className="text-ct-blue-600">
                  Login Here
                </Link>
              </span>
                            <LoadingButton
                                loading={store.requestLoading}
                                textColor="text-ct-blue-600"
                            >
                                Sign Up
                            </LoadingButton>
                        </form>
                    </FormProvider>
                </div>
            )}
        </section>
    );
};
