import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Calculadoras from "./pages/Calculadoras.tsx";
import JurosCompostos from "./pages/JurosCompostos.tsx";
import PrimeiroMilhao from "./pages/PrimeiroMilhao.tsx";
import AlugarXFinanciar from "./pages/AlugarXFinanciar.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculadoras" element={<Calculadoras />} />
          <Route path="/calculadoras/juros-compostos" element={<JurosCompostos />} />
          <Route path="/calculadoras/primeiro-milhao" element={<PrimeiroMilhao />} />
          <Route path="/calculadoras/alugar-x-financiar" element={<AlugarXFinanciar />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
