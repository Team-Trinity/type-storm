import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useServer from "@/hooks/useServer";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Register() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    const { createUserData } = useServer();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset
    } = useForm<any>();

    const submitHandler = async (data: {
        email: string;
        password: string;
        name: string;
    }) => {
        authContext
            .createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);
                authContext.updateUser(result.user, data.name);
            })
            .then(() => {
                createUserData({
                    email: data.email,
                    name: data.name,
                    role: "student",
                    accuracyRecords: [],
                    cpmRecords: [],
                    wpmRecords: [],
                    praticeTime: 0
                });
                console.log("User profile created successfully");
            })
            .catch((error) => {
                console.error(error);
            }),
            console.log(data);
        reset();
    };

    return (
        <div className="mx-4 flex max-w-xs flex-col items-center justify-center gap-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to register
            </p>
            <div className="grid w-full gap-6">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div>
                        <Label>Name</Label>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue=""
                            rules={{
                                required: "Name is required"
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="name"
                                    placeholder="Your Name"
                                    type="text"
                                />
                            )}
                        />
                        {errors.name && (
                            <span className="text-destructive">
                                {errors.name.message as string}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
                            rules={{
                                required: "Email is required"
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoComplete="email"
                                />
                            )}
                        />
                        {errors.email && (
                            <span className="text-destructive">
                                {errors.email.message as string}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            rules={{
                                required: "Password is mandatory",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password needs minimum 6 characters"
                                },
                                maxLength: {
                                    value: 25,
                                    message: "Password too long"
                                },
                                pattern: {
                                    value: /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/,
                                    message:
                                        "At lease one special character needed"
                                }
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                />
                            )}
                        />
                        {errors.password && (
                            <span className="text-destructive">
                                {errors.password.message as string}
                            </span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className={`w-full ${isSubmitting && `disabled`}`}
                    >
                        Register
                    </Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Already have an account ?{" "}
                    <span
                        className="cursor-pointer font-semibold underline underline-offset-4 hover:text-primary"
                        onClick={() => router.push("/login")}
                    >
                        login
                    </span>
                    .
                </p>
            </div>
        </div>
    );
}
