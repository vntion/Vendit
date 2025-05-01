import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeCategory } from "../../slices/threadSlice";

function SearchThreadByCategoryForm() {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(changeCategory(category));
  };

  useEffect(() => {
    return () => dispatch(changeCategory(""));
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-purple-600 p-2"
    >
      <label htmlFor="searchKategori" className="text-sm font-semibold">
        Cari kategori
      </label>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        id="searchKategori"
        className="w-full rounded-xs bg-gray-300 px-2 py-1 text-sm text-black outline-none"
      />
      <button
        type="submit"
        className="mt-2 w-full rounded-xs bg-purple-600 py-0.5 text-sm hover:cursor-pointer hover:bg-purple-800"
      >
        Cari
      </button>
    </form>
  );
}

export default SearchThreadByCategoryForm;
