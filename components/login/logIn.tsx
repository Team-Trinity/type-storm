import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Icons } from "../shared/Icons/icons";

type loginData = {
    email: string;
    password: string;
};

function Login() {
    const [error, setError] = useState();
    const router = useRouter();
    const { control, handleSubmit } = useForm<loginData>();

    const authContext = useContext(AuthContext);

    const submitHandler = async (data: loginData) => {
        console.log(`Trying to log in ${data}`);
        authContext
            .signIn(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);
            })
            .catch((error) => {
                setError(error.message);
                console.error(error);
            });
    };

    const googleLoginHandler = async () => {
        authContext
            .googleSignIn()
            .then(async (result) => {
                console.log(result.user);
            })
            .catch((error) => {
                setError(error.message);
                console.error(error);
            });
    };

    const gitHubLoginHandler = async () => {
        authContext
            .githubSignIn()
            .then(async (result) => {
                console.log(result.user);
            })
            .catch((error) => {
                setError(error.message);
                console.error(error);
            });
    };

    return (
        <div className="mx-4 flex max-w-xs flex-col items-center justify-center gap-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to log in
            </p>
            <div className="grid w-full gap-6">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
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
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            rules={{
                                required: "Password is mandatory"
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
                    </div>
                    {error && <span className="text-destructive">{error}</span>}
                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    {"Don't have an account ? "}
                    <span
                        className="cursor-pointer font-semibold underline underline-offset-4 hover:text-primary"
                        onClick={() => router.push("/register")}
                    >
                        register
                    </span>
                    .
                </p>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    type="button"
                    onClick={googleLoginHandler}
                    disabled
                >
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    onClick={gitHubLoginHandler}
                    disabled
                >
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    GitHub
                </Button>
            </div>
        </div>
    );
}

export default Login;
