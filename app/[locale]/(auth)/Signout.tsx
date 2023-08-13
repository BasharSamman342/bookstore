"use client";

import { signOut } from "next-auth/react";
import React from "react";

function Signout() {
  return (
    <div className="menu-item px-5">
      <a className="menu-link px-5" onClick={() => signOut()}>
        Sign Out
      </a>
    </div>
  );
}

export default Signout;
