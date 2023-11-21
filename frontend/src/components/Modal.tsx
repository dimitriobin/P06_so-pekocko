import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

interface Props {
  open: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export function Modal({ open, closeModal, children }: Props) {
  return (
    <dialog id="addSauceModal" className={`modal ${open && 'modal-open'}`}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-ghost btn-circle absolute right-5 top-5"
          onClick={() => closeModal()}>
          <IoClose className="w-7 h-7" />
        </button>
        <div className="p-5">{children}</div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => closeModal()}>close</button>
      </form>
    </dialog>
  );
}
