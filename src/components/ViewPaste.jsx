import React from 'react'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

const ViewPaste = () => {

  const allPastes = useSelector((state) => state.paste.pastes);

  const {id} = useParams();

  const paste = allPastes.find((paste) => paste.id === id);


  return (
    <div className="max-w-[700px] mx-auto">
      <div className="w-full gap-4 flex justify-between">
        <input
          className="p-3 pl-5 rounded-lg w-[95%] hover:border-gray-500 bg-black text-white border-2"
          type="text"
          value={paste.title}
          disabled
        />
        <button
          className="p-3 rounded-lg  hover:border-gray-500 bg-black text-white font-medium border-2"
          onClick={() => {
            navigator.clipboard.writeText(paste?.content);

            toast("Paste Copied Successfully");
          }}
        >
          <Copy />
        </button>
      </div>

      <div className="w-full mt-4">
        <textarea
          value={paste.content}
          rows={20}
          disabled
          className=" w-full p-2 pl-5 rounded-lg hover:border-gray-500 bg-black text-white border-2"
        />
      </div>
    </div>
  );
}

export default ViewPaste