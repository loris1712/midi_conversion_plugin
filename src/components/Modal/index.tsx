import { Button } from "@radix-ui/themes";


interface ModalProps {
    onClose: ()=> void,
    title?: string,
    content?: React.ReactNode,
    buttons?: React.ReactNode
}

const Modal = ({ content, buttons, title, onClose }: ModalProps) => (
  <dialog className="fixed h-screen w-screen top-0 left-0 right-0 bottom-0 bg-black/55 flex flex-col items-center justify-center">
    <div className="h-fit w-full max-w-[380px] bg-[#262626] p-4 rounded-md flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <h4 className="font-extrabold">{title}</h4>
        <Button color="red" variant="soft" onClick={onClose}>X</Button>
      </div>
      <div className="mb-2">{content}</div>
      <div>{buttons}</div>
    </div>
  </dialog>
);

export default Modal