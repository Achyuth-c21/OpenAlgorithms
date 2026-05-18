import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Home, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router";

export function LogoDropdown() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 relative rounded-full neumorphic-button hover:bg-transparent transition-transform hover:scale-105 ml-2 border-0 overflow-hidden"
          >
            <img
              src="/oa-logo.png"
              alt="Logo"
              className="rounded-full object-cover w-full h-full p-0.5"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64 neumorphic-card border-none mt-4 p-2 z-[100]">
          <DropdownMenuItem
            onClick={() => navigate("/")}
            className="cursor-pointer focus:bg-secondary rounded-xl py-3 px-3"
          >
            <Home className="mr-3 h-4 w-4 text-primary" />
            <span className="font-medium">Landing Page</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={toggleTheme}
            className="cursor-pointer focus:bg-secondary rounded-xl py-3 px-3"
          >
            {theme === "light" ? (
              <Moon className="mr-3 h-4 w-4 text-primary" />
            ) : (
              <Sun className="mr-3 h-4 w-4 text-primary" />
            )}
            <span className="font-medium">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}