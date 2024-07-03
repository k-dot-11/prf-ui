import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainContent } from "./components/main-content";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/auth";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <AuthProvider>
                    <MainContent />
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
