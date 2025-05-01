import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchCreateComment } from "../../slices/threadSlice";

function AddCommentForm() {
  const [content, setContent] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(fetchCreateComment({ id, content }));
    setContent("");
  };

  return (
    <>
      <h1 className="mt-5 font-bold">Beri komentar</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-20 resize-none border-b border-b-gray-300 px-1"
          placeholder="Komentar..."
          required
        />
        <button type="submit" className="rounded-md bg-purple-600 py-1 text-sm">
          Tambah komentar
        </button>
      </form>
    </>
  );
}

export default AddCommentForm;
