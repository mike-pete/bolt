import { Dialog } from "@headlessui/react";
import { useState } from "react";
import TextArea from "~/app/_components/TextArea/TextArea";

const JobModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [val, setVal] = useState("");

  return (
    <Dialog
      as="div"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4 backdrop-blur-sm"
    >
      <Dialog.Panel className=" max-w-full rounded-lg   border-2 bg-white shadow-lg max-h-full overflow-auto">
        <TextArea
          value={val}
          setValue={setVal}
          placeholder="new note..."
          className="w-[55ch]  max-w-full resize-none rounded-t-lg p-8 pb-4 outline-none min-h-28"
        />
        <div className="flex justify-end gap-2 border-b-2 p-4 pt-0">
          <button className="bg-sky-400 text-white px-2 py-1 rounded-lg uppercase text-sm font-semibold">SAVE</button>
        </div>
        <div className="rounded-b-lg bg-zinc-50 p-4 flex flex-col gap-2">
          <div className="rounded-lg border-2 bg-white p-4">hello</div>
          <div className="rounded-lg border-2 bg-white p-4">hello</div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default JobModal;
