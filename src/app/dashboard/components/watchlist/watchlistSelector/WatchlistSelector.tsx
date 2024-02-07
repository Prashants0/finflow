import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Dialog } from "@/components/ui/dialog";
import { CaretDownIcon, CaretSortIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

function WatchlistSelector({ className }: { className?: string }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [showNewWatchlistDialog, setShowNewWatchlistDialog] =
    React.useState(false);
  const [selectedWatchlist, setSelectedWatchlist] =
    React.useState<String>("Select a watchlist");

  const handleSelectWatchlist = (value: string) => {
    setSelectedWatchlist(value);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={showNewWatchlistDialog}
        onOpenChange={setShowNewWatchlistDialog}
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              aria-controls="watchlist-selector"
              role="combobox"
              aria-label="Select a watchlist"
              aria-expanded={open}
              className={"h-10 max-w-min max-w-50 m-2 justify-between"}
            >
              <span>{selectedWatchlist}</span>
              <CaretDownIcon className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-50 p-0 ">
            <Command className="rounded-none">
              <CommandInput placeholder="Search watchlist" />
              <CommandList className="rounded-none">
                <CommandEmpty>No watchlist found</CommandEmpty>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Dialog>
    </>
  );
}

export default WatchlistSelector;
