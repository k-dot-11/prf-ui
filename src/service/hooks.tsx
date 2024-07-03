import { useMutation } from "@tanstack/react-query";
import { generateForm, handleSignIn, handleSignOut } from ".";
import { useToast } from "../components/ui/use-toast";
import { User } from "firebase/auth";

export const useGenerateURLMutation = (
    matchURL: string,
    isHomeTeam: boolean,
    userToken: User | null
) => {
    const { toast } = useToast();

    return useMutation({
        mutationFn: () => generateForm(matchURL, isHomeTeam, userToken),
        mutationKey: ["generateForm", matchURL, isHomeTeam],
        retry: false,
        onError: (error) => {
            toast({
                title: "Error",
                description: `Error occurred while generating form : ${error.message}`,
                duration: 2000,
                variant : "destructive"
            });
        },
    });
};

export const useGoogleSignInMutation = () => {
    const { toast } = useToast();
    return useMutation({
        mutationFn: () => handleSignIn(),
        mutationKey: ["googleSignIn"],
        retry: false,
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: `Signed in as ${data.user.displayName}`,
                duration: 2000,
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Error : ${error.message}`,
                duration: 2000,
                variant : "destructive"
            });
        },
    });
};

export const useGoogleSignOutMutation = () => {
    const { toast } = useToast();
    return useMutation({
        mutationFn: () => handleSignOut(),
        mutationKey: ["googleSignOut"],
        retry: false,
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Sign out successful",
                duration: 2000,
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Error : ${error.message}`,
                duration: 2000,
                variant : "destructive"
            });
        },
    });
};
