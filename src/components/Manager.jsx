import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  const [passwordArray, setPasswordArray] = useState([]);

  const passwordRef = useRef("");

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
  if (form.id) {

    const updatedArray = passwordArray.map((item) =>
      item.id === form.id ? form : item
    );
    setPasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
  } 
  
  else {
    const newPassword = { ...form, id: uuidv4() };
    const updatedArray = [...passwordArray, newPassword];
    setPasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
  }

  setForm({
    site: "",
    username: "",
    password: "",
    id: null,
  });
};

  const editPassword = (id) => {
  console.log("Editing password with id: " + id);
  const selected = passwordArray.find((item) => item.id === id);
  if (selected) {
    setForm({
      site: selected.site,
      username: selected.username,
      password: selected.password,
      id: selected.id
    });
  }
};

  const deletePassword = (id) => {
    console.log('Deleting password with id: ' + id);
    setPasswordArray(passwordArray.filter((password) => password.id !== id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((password) => password.id !== id)));
  };

  const seePassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else if (passwordRef.current.type === "text") {
      passwordRef.current.type = "password";
    }
  };

  const copyText = (word) => {
    toast("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(word);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>
        <div className="flex flex-col p-4"></div>
        <div className="mx-auto w-2/3 flex flex-col justify-center align-center text-center gap-5">
          <p className="font-bold pb-4 text-2xl">
            <span className="text-green-700 text-2xl">&lt;</span>Pass
            <span className="text-2xl text-green-500">Op/&gt;</span>
            <p className="text-lg pt-5 text-green-700">
              Your own Password Manager
            </p>
          </p>
          <input
            className="rounded-full border border-green-500 text-black p-4 py-1"
            type="text"
            name="site"
            value={form.site}
            onChange={(e) => {
              setForm({ ...form, site: e.target.value });
            }}
            placeholder="Website Link"
          />
          <div className="flex w-full justify-center gap-2">
            <input
              className="rounded-full border border-green-500 text-black p-4 py-1 w-full"
              type="text"
              name="username"
              value={form.username}
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
              }}
              placeholder="Username"
            />
            <div className="relative flex">
              <input
                className="rounded-full border border-green-500 text-black p-4 py-1 w-full"
                type="password"
                ref={passwordRef}
                name="password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
                placeholder="Password"
              />
              <span
                className="absolute right-1 cursor-pointer"
                onClick={seePassword}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="hover"
                  stroke="bold"
                ></lord-icon>
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="rounded-full border-2 border-green-500 p-4 py-1 w-full bg-green-100 text-black hover:bg-green-500 hover:text-black flex items-center gap-2 justify-center"
          >
            <lord-icon
              src="https://cdn.lordicon.com/vjgknpfx.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
            <span className="font-bold">Save Password</span>
          </button>
        </div>
        <div className="text-center pt-10">
          <p className="text-2xl font-bold text-green-700 pb-5">
            Your Passwords
          </p>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-1/2 mx-auto overflow-hidden rounded-lg">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Website Link</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((password, index) => (
                  <tr key={index}>
                    <td className=" gap-5 flex align-center justify-center py-2 border border-white text-center">
                      <a href={password.site} target="_blank">
                        {password.site}
                      </a>
                      <div
                        className="size-7 cursor-pointer"
                        onClick={() => {
                          copyText(password.site);
                        }}
                      >
                        <lord-icon
                          style={{ width: "25px", height: "25px" }}
                          src="https://cdn.lordicon.com/hmpomorl.json"
                          trigger="hover"
                          stroke="bold"
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center">
                      {password.username}
                    </td>
                    <td className="py-2 border border-white text-center">
                      {password.password}
                    </td>

                    <td className="flex gap-4 justify-center py-2 border border-white text-center">
                      <span onClick={()=>{editPassword(password.id)}}>
                        <lord-icon
                        style={{"width":"25px","height":"25px"}}
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          stroke="bold"
                        ></lord-icon>
                      </span>
                      <span onClick={()=>{deletePassword(password.id)}}>
                        <lord-icon
                        style={{"width":"25px","height":"25px"}}
                          src="https://cdn.lordicon.com/jzinekkv.json"
                          trigger="hover"
                          stroke="bold"
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
