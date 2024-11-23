import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { removeFromPaste } from "../slice/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { PencilLine, Copy, Eye, Calendar, Trash2 } from "lucide-react";

const Paste = () => {
  const dispatch = useDispatch();

  const options = { year: "numeric", month: "long", day: "numeric" };

  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPastes = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDeletePaste(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div className="max-w-[700px] mx-auto flex flex-col gap-3 px-4 py-4">
      <div className="w-full mx-auto flex justify-between">
        <input
          className="p-3 pl-5 rounded-lg  text-white bg-black w-full hover:border-gray-500 border-2"
          type="search"
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col gap-4 mt-5 border border-white rounded-lg pb-5">
        <h2 className="px-4 text-4xl font-bold border border-white rounded-t-lg p-3">
          All Pastes
        </h2>

        <div className="w-full px-4 pt-2 flex flex-col gap-y-5">
          {filteredPastes.length > 0 ? (
            filteredPastes.map((paste) => (
              <div
                className="border rounded-lg p-4 flex flex-row justify-between"
                key={paste?.id}
              >
                <div className="w-[50%] flex flex-col space-y-3">
                  <div className="text-4xl font-semibold">{paste.title}</div>
                  <div className="text-sm font-normal line-clamp-3 max-w-[80%]">
                    {paste.content}
                  </div>
                </div>

                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-row gap-1">
                    <button className="p-1 rounded-md bg-black text-white border-2 hover:border-gray-500">
                      <Link to={`/?pasteId=${paste?.id}`}>
                        <PencilLine />
                      </Link>
                    </button>

                    <button className="p-1 rounded-md bg-black text-white border-2 hover:border-gray-500">
                      <Link to={`/pastes/${paste?.id}`}>
                        <Eye />
                      </Link>
                    </button>

                    <button
                      className="p-1 rounded-md bg-black text-white border-2 hover:border-gray-500"
                      onClick={() => handleDeletePaste(paste?.id)}
                    >
                      <Trash2 />
                    </button>

                    <button
                      className="p-1 rounded-md bg-black text-white border-2 hover:border-gray-500"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);

                        toast("Paste Copied Successfully");
                      }}
                    >
                      <Copy />
                    </button>
                  </div>

                  <div className="font-medium mx-auto">
                    {paste.createdAt
                      ? new Date(paste.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )
                      : "N/A"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-4xl font-semibold text-center">
              No Pastes Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
