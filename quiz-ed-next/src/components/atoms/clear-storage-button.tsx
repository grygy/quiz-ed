"use client";

import { Button } from "@kiwicom/orbit-components";

const ClearStorageButton = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      <Button
        type="criticalSubtle"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear local storage
      </Button>
    );
  }
  return null;
};

export default ClearStorageButton;
