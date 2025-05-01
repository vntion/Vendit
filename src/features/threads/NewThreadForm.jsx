import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../ui/Spinner";
import { fetchCreateThread } from "../../slices/threadSlice";

function NewThreadForm({ onCloseModal }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const { status, error } = useSelector((state) => state.thread);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) return;
    dispatch(fetchCreateThread({ title, body, category }));

    onCloseModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="borber-b flex flex-col gap-2 p-2 text-black"
    >
      <h1 className="text-2xl font-bold">Buat thread baru</h1>
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          <div className="flex flex-col">
            <label htmlFor="title">Judul</label>
            <input
              type="text"
              id="title"
              className="rounded-sm border border-gray-900 px-2 py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category">Kategori</label>
            <input
              type="text"
              id="category"
              className="rounded-sm border border-black px-2 py-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <div className="row-span-2 flex flex-col">
          <label htmlFor="isi">Isi</label>
          <textarea
            id="isi"
            className="h-56 w-72 grow rounded-sm border border-black px-2 py-1"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 text-sm *:rounded-sm *:hover:cursor-pointer">
        <button
          type="reset"
          onClick={onCloseModal}
          className="border border-purple-500 px-4 py-2 active:bg-gray-200"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-purple-700 px-5 py-2 text-white active:bg-purple-900"
        >
          {status === "loading" ? <Spinner size="mini" /> : "Buat"}
        </button>
      </div>
    </form>
  );
}

export default NewThreadForm;
