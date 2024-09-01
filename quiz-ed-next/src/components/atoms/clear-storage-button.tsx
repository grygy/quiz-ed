"use client";
const ClearStorageButton = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      <button
        className="btn btn-error"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear local storage
      </button>
    );
  }
  return null;
};

export default ClearStorageButton;
