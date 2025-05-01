import { AiFillPlusCircle } from "react-icons/ai";
import Modal from "./Modal";
import NewThreadForm from "../features/threads/NewThreadForm";
import { useSelector } from "react-redux";

function AddThreadButton() {
  const { isAuthorized } = useSelector((state) => state.auth);

  if (!isAuthorized) return null;

  return (
    <Modal>
      <Modal.Open opens="thread-form">
        <button
          data-testid="addThreadBtn-component"
          className="flex items-center gap-1 rounded-md px-2 py-2 hover:cursor-pointer hover:bg-purple-600/25"
        >
          <AiFillPlusCircle className="text-2xl text-purple-500" />
          <span className="text=sm">Tambah thread</span>
        </button>
      </Modal.Open>

      <Modal.Window name="thread-form">
        <NewThreadForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddThreadButton;
