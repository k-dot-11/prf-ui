import {
    QueryClient,
    QueryClientProvider,
    useMutation,
} from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { generateForm } from "./service";
import { useState } from "react";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { ModeToggle } from "./components/mode-toggle";
import Spinner from "./components/ui/spinner";
import { useToast } from "./components/ui/use-toast";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <MainContent />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

function MainContent() {
    const [matchURL, setMatchURL] = useState("");
    const [isHomeTeam, setIsHomeTeam] = useState(true);
    const { toast } = useToast();

    const { isPending, isSuccess, data, mutate } = useMutation({
        mutationFn: () => generateForm(matchURL, isHomeTeam),
        mutationKey: ["generateForm", matchURL, isHomeTeam],
        retry: false,
        onError: (error) => {
            toast({
                title: "Error",
                description: `Error occurred while generating form : ${error.message}`,
                duration: 2000,
            });
        },
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate();
    };

    const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMatchURL(value);
    };

    return (
        <div
            className="min-h-screen"
            style={{ transform: "translate3d(0,0,0)" }}
        >
            <div className="flex flex-row-reverse p-3">
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
                                onClick={handleClick}
                                disabled={isPending || matchURL === ""}
                            >
                                Submit
                            </Button>
                        </form>
                        <div className="items-center py-4">
                            {isPending && <Spinner />}
                            {isSuccess && (
                                <div>
                                    <p>Form generated successfully : <a href={data.url}>Link</a></p>
                                    
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
