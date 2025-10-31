import { useState } from "react";
import { SkuSearchInput } from "../SkuSearchInput";

export default function SkuSearchInputExample() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-8 max-w-2xl">
      <SkuSearchInput value={searchValue} onChange={setSearchValue} />
    </div>
  );
}
