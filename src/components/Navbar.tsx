import React from "react";
import MaxWidthrapper from "./MaxWidthrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <nav className="sticky h-14 inset-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthrapper>
        <div className="flex h-14 items-center justify-between bordder-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            Grove.
          </Link>
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="./pricing"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Pricing
              </Link>
              <Link
                href="/auth/signup"
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                Sign In
              </Link>
            </>
          </div>
        </div>
      </MaxWidthrapper>
    </nav>
  );
}

export default Navbar;
