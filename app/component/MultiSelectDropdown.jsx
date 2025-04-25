import { useEffect, useState } from "react";
import { ArrowDown2 } from "iconsax-react";

export default function MultiSelectDropdown({ 
    fetchOptions, 
    options = [], 
    onSelect, 
    placeholder = "Kelas", 
    wideInput = "min-w-40",
    textInputSize = "text-sm",
    textDropDownSize = "text-sm",
    wideDropdown = "w-full"
  }) {
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [classOption, setClassOption] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (fetchOptions) {
          const data = await fetchOptions();
          if (isMounted) {
            setClassOption(data);
          }
        } else {
          setClassOption(options);
        }
      } catch (err) {
        console.error("Error fetching options:", err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleItem = (item) => {
    const updated = selected.includes(item)
      ? selected.filter((v) => v !== item)
      : [...selected, item];

    setSelected(updated);
    onSelect?.(updated);
  };

  const isSelected = (item) => selected.includes(item);

  return (
    <div className={`relative ${wideInput}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full p-2 rounded-md border ${textInputSize} flex items-center justify-between ${
          selected.length > 0 ? "bg-pri-main text-white" : "text-black"
        }`}
      >
        <span className="flex items-center gap-2">
          {placeholder}
          {selected.length > 0 && (
            <span className="ml-2 font-semibold bg-white py-1.5 px-2 text-xs rounded-full text-pri-main">
              {selected.length}
            </span>
          )}
        </span>
        <ArrowDown2 size="20" color="currentColor" variant="Outline" />
      </button>

      {open && (
        <div className={`absolute mt-2 ${wideDropdown} bg-white ${textDropDownSize} border rounded-md shadow z-50 max-h-64 overflow-y-auto`}>
          {classOption.map((kelas) => (
            <label
              key={kelas.value}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isSelected(kelas.value)}
                onChange={() => toggleItem(kelas.value)}
                className="mr-2 text-pri-main accent-pri-main"
              />
              {kelas.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
