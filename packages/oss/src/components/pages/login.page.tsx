import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {FormInput} from "@/components/UI/atoms/FormInput";
import { LoadingButton } from "@/components/UI/atoms/LoadingButton";
import { toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useAuthStore} from "@/store";
import { post } from "@/api/config/requests";
import {SIGNIN_URL} from "@/api/config/constants";
import {useMutation } from "@tanstack/react-query";
import {getToken} from "@/utilis/tokenUtilis";

const loginSchema = object({
    email: string()
        .min(1, "Email address is required")
        .email("Email Address is invalid"),
    password: string()
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || "/dashboard";

    const methods = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const store = useAuthStore();

    //  API Login Mutation
    const { mutate: loginUser } = useMutation(
        {
            mutationFn: (userData: LoginInput) => post(SIGNIN_URL, userData),
            onMutate(variables) {
                store.setRequestLoading(true);
            },
            onSuccess: () => {
                store.setRequestLoading(false);
                toast.success("You successfully logged in!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                navigate(from);
            },
            onError: (error: any) => {
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
        }
    );

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        const token = getToken();

        if (token) {
            // Token exists, redirect to the dashboard or main page
            navigate(from);
        }
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
        // ? Executing the loginUser Mutation
        loginUser(values);
    };

    return (
        <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
            <ToastContainer />
            <div className="w-full">
                <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
                    Welcome Back
                </h1>
                <h2 className="text-lg text-center mb-4 text-ct-dark-200">
                    Login to have access
                </h2>
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmitHandler)}
                        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
                    >
                        <FormInput label="Email" name="email" type="email" />
                        <FormInput label="Password" name="password" type="password" />

                        <div className="text-right">
                            <Link to="/forgotpassword" className="">
                                Forgot Password?
                            </Link>
                        </div>
                        <LoadingButton
                            loading={store.requestLoading}
                            textColor="text-ct-blue-600"
                        >
                            Login
                        </LoadingButton>
                        <span className="block">
              Need an account?{" "}
                            <Link to="/signup" className="text-ct-blue-600">
                Sign Up Here
              </Link>
            </span>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
};
