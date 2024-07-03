import { useContext, useState } from "react";
import {
    useGenerateURLMutation,
    useGoogleSignInMutation,
    useGoogleSignOutMutation,
} from "../service/hooks";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Spinner from "./ui/spinner";
import { AuthContext } from "../context/auth";
import { useToast } from "./ui/use-toast";

export function MainContent() {
    const [matchURL, setMatchURL] = useState("");
    const [isHomeTeam, setIsHomeTeam] = useState(true);
    const googleUser = useContext(AuthContext);
    const { toast } = useToast();

    const { isPending, isSuccess, data, mutate } = useGenerateURLMutation(
        matchURL,
        isHomeTeam,
        googleUser
    );
    const googleSignInMutation = useGoogleSignInMutation();
    const googleSignOutMutation = useGoogleSignOutMutation();

    const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        //validate input for URL
        const urlRegex = new RegExp(
            "^(https://)?(www.)?transfermarkt.com/spielbericht/index/spielbericht/.*$"
        );
        if (!urlRegex.test(matchURL)) {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid transfermarkt.com URL",
                variant: "destructive",
            });
            return;
        }
        if (!googleUser) {
            toast({
                title: "Sign in required",
                description: "Please sign in to continue",
            });
        } else {
            mutate();
        }
    };

    const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMatchURL(value);
    };

    const handleAuthButtonClick = () => {
        if (googleUser) {
            googleSignOutMutation.mutate();
        } else {
            googleSignInMutation.mutate();
        }
    };

    return (
        <div
            className="min-h-screen"
            style={{ transform: "translate3d(0,0,0)" }}
        >
            <div className="flex flex-row-reverse p-3 gap-3">
                <Button variant={"outline"} onClick={handleAuthButtonClick}>
                    {googleUser ? "Sign Out" : "Sign In"}
                </Button>
                <ModeToggle />
            </div>
            <div className="flex items-center justify-center max-h-screen ">
                <div className="w-full px-4 max-w-3xl">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">
                            Players Rating Form Generator
                        </h1>
                        <form className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="input"
                                    className="py-2 block text-sm font-medium"
                                >
                                    Enter the transfermarkt.com URL
                                </Label>
                                <Input
                                    autoComplete="off"
                                    id="input"
                                    type="text"
                                    className="w-full"
                                    onChange={handleURLChange}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="checkbox"
                                    checked={isHomeTeam}
                                    onCheckedChange={() => {
                                        setIsHomeTeam(!isHomeTeam);
                                    }}
                                />
                                <Label htmlFor="checkbox">Home Team</Label>
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={handleSubmitClick}
                                disabled={isPending || matchURL === ""}
                            >
                                Submit
                            </Button>
                        </form>
                        <div className="justify-center py-4 flex">
                            {isPending && <Spinner />}
                            {isSuccess && (
                                <div>
                                    <p>Form Generated Successfully</p>
                                    <div className="flex gap-3 justify-center">
                                        <Button variant={"link"}>
                                            <a href={data.url}>View</a>
                                        </Button>
                                        <Button variant={"link"}>
                                            <a href={data.editURL}>Edit</a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
