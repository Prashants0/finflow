import { createContext, useContext, useState } from "react";

const Watchlist = createContext<string>("");
const UpdateWatchlist = createContext<
  React.Dispatch<React.SetStateAction<string>>
>(() => {});

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<string>("");

  return (
    <Watchlist.Provider value={watchlist}>
      <UpdateWatchlist.Provider value={setWatchlist}>
        {children}
      </UpdateWatchlist.Provider>
    </Watchlist.Provider>
  );
}

export const useWatchlist = () => {
  const context = useContext(Watchlist);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};

export const useUpdateWatchlist = () => {
  const context = useContext(UpdateWatchlist);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
