import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

function SymbolSerach({ symbol_name }: { symbol_name: string }) {
  return (
    <>
      <div className="p-2 flex justify-items-end">
        <div className="w-full h-7 text-base flex items-center ">
          {symbol_name}
        </div>
      </div>
    </>
  );
}

export default SymbolSerach;
