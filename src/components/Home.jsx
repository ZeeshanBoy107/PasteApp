import { useEffect, useState } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { addToPastes, updateToPastes } from "../slice/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes); 

  function createPasteOrUpdate() {
    const paste = {
      title,
      content,
      id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if(pasteId) {
      //update paste
      dispatch(updateToPastes(paste));
    }
    else {
      //create paste
      dispatch(addToPastes(paste));
    }
    
    // after creating or updating paste, reset the title and content
    setTitle("");
    setContent("");
    setSearchParams({});
  }

  useEffect(() => { 
    if(pasteId) {
      const paste = allPastes.find((paste) => paste.id === pasteId);
      if(paste) {
        setTitle(paste.title);
        setContent(paste.content);
      }
    }

  }, [pasteId])
  

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="grid grid-cols-[4fr_1.5fr] items-center justify-center w-full gap-4">
        <input
          className="p-3 pl-5 rounded-lg  text-white bg-black hover:border-gray-500 border-2"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="p-3 bg-whitep-3 pl-5 rounded-lg  text-white bg-black w-full hover:border-gray-500 border-2 font-medium "
          onClick={createPasteOrUpdate}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="w-full mt-4">
        <textarea
          value={content}
          placeholder="Enter Content Here"
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full p-2 pl-5 rounded-lg text-white bg-black hover:border-gray-500 border-2"
        />
      </div>
    </div>
  );
};

export default Home;
