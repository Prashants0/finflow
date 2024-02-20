import { createContext, useContext, useState } from "react";

const SelectedSymbol = createContext<string>("");
const UpdateSelectedSymbol = createContext({});

export function SelectedSymbolProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");

  return (
    <SelectedSymbol.Provider value={selectedSymbol}>
      <UpdateSelectedSymbol.Provider value={setSelectedSymbol}>
        {children}
      </UpdateSelectedSymbol.Provider>
    </SelectedSymbol.Provider>
  );
}

export const useSelectedSymbol = () => {
  const context = useContext(SelectedSymbol);
  if (context === undefined) {
    throw new Error(
      "useSelectedSymbol must be used within a SelectedSymbolProvider"
    );
  }
  return context;
};

export const useUpdateSelectedSymbol = () => {
  const context = useContext(UpdateSelectedSymbol);
  if (context === undefined) {
    throw new Error(
      "useSelectedSymbol must be used within a SelectedSymbolProvider"
    );
  }
  return context;
};
