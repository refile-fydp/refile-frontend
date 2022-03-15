import "./LandingPage.css";
import * as FaIcons from "react-icons/fa";
import React, { useEffect, useState } from "react";
import FolderList from "./components/FolderList";
import ThreadList from "./components/ThreadList";
import {
  getSyncAttachments,
  getFirstAttachments,
  getUserInformation,
  postNewCategories,
  getThreadsApi,
  getSendersApi,
} from "./ApiContract";
import AddNewFolder from "./AddNewCategory";
import AttachmentTable from "./components/AttachmentTable";
import ThreadTable from "./components/ThreadTable";
import SenderTable from "./components/SenderTable";
import ReactSearchBox from "react-search-box";
import _ from "lodash";

function LandingPage() {
  const threadPresetList = [
    { name: "Thread1", sender: "tosh@gmail.com", creation_date: "07/14/2021" },
    { name: "Thread2", sender: "tosh@gmail.com", creation_date: "07/14/2021" },
    { name: "Thread3", sender: "tosh@gmail.com", creation_date: "07/14/2021" },
  ];

  const quickFiltersList = [
    { name: "sent by me" },
    { name: "from past year" },
    { name: "pdf files" },
  ];

  const [workspace, setWorkspace] = useState("files");
  const [folderSelected, setFolderSelected] = useState();
  const [threadSelected, setThreadSelected] = useState();
  const [categories, setCategories] = useState();
  const [threads, setThreads] = useState([]);
  const [senders, setSenders] = useState([]);
  const [backFolderPressed, setBackFolderPressed] = useState(false);
  const [quickFilters, setQuickFilters] = useState(quickFiltersList);

  const [threadNameClicked, setThreadNameClicked] = useState("");
  const handleThreadClick = (threadName) => setThreadNameClicked(threadName);
  const [senderNameClicked, setSenderNameClicked] = useState("");
  const handleSenderClick = (senderName) => setSenderNameClicked(senderName);

  const [attachments, setAttachments] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const attachmentsForFolders = attachments.slice(0);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => getAttachments(), []);
  
  useEffect(() => getThreadsCall(), []);
  useEffect(() => getSendersCall(), []);

  useEffect(() => getUserInfo(), []);
  useEffect(() => threadClicked(), [threadNameClicked]);
  useEffect(() => senderClicked(), [senderNameClicked]);
  useEffect(() => setFolderSelectedState(), [folderSelected]);
  useEffect(() => setCategoriesList(), [userInfo]);
  useEffect(() => backFolder, [folderSelected]);

  function searchFiltering() {
    attachments.filter(item => {
      return Object.keys(item).some(key =>
          item[key].toString().toLowerCase().includes(searchTerm.toString().toLowerCase())
        ) 
    });
  }
  function addCategory(category) {
    var newList = categories;
    newList.push(category.name);
    setCategories(newList);
    setNewCategories();
  }

  function addQuickFilters(quickFilters) {
    setCategories([quickFilters, ...quickFilters]);
  }

  async function setNewCategories() {
    var result = await postNewCategories(categories);
  }

  async function getUserInfo() {
    var userInfo = await getUserInformation();
    console.log(userInfo.categories);
    setUserInfo(userInfo);
  }

  async function getThreadsCall(){
    var threads = await getThreadsApi();
    setThreads(threads);  
  }

  async function getSendersCall(){
    var senders = await getSendersApi();
    setSenders(senders);  
  }

  async function getAttachments() {
    var attachments = await getFirstAttachments();
    setAttachments(attachments);
  }

  async function refreshAttachments() {
    setAttachments([]);
    var attachments = await getSyncAttachments();
    setAttachments(attachments);
  }

  function threadClicked() {
    var filteredByThreadAttachments = [];

    if (threadNameClicked == "") {
    } else {
      attachments.forEach((element) => {
        if (element.thread == threadNameClicked) {
          console.log("element: " + element.thread);
          filteredByThreadAttachments.push(element);
        }
      });
    }

    setAttachments(filteredByThreadAttachments);
  }

  function senderClicked() {
    var filteredBySenderAttachments = [];

    if (senderNameClicked == "") {
      console.log("clicked on landing page was empty");
    } else {
      attachments.forEach((element) => {
        if (element.senderEmail == senderNameClicked) {
          filteredBySenderAttachments.push(element);
        }
      });
    }

    setAttachments(filteredBySenderAttachments);
  }

  function setCategoriesList() {
    setCategories(userInfo.categories);
  }

  function backFolder() {
    setBackFolderPressed(!backFolderPressed);
  }

  function setFolderSelectedState() {
    //setBackFolderPressed(false);
  }

  return (
    <div className="app">
      <div className="header__container">
        <div className="app__header">
          <p className="header__title">Re:File</p>
          <p className="header__subtitle">{userInfo.email}</p>
        </div>
        <form className="header__searchform">
          <input
            type="text"
            className="header__searchform__input"
            placeholder="Search file names, users, or subjects"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <FaIcons.FaSearch
            className="header__searchform__submit"
            type="submit"
            value="Search"
            onClick={searchFiltering}
          ></FaIcons.FaSearch>
        </form>
        <button
          type="button"
          className="refresh_button"
          onClick={refreshAttachments}
        >
          <FaIcons.FaRedo className="refresh_icon">
            REFRESH ATTACHMENTS
          </FaIcons.FaRedo>
          <p className="refresh_text">Refresh</p>
        </button>
        <button type="button" className="refresh_button">
          <FaIcons.FaPlusCircle className="refresh_icon"></FaIcons.FaPlusCircle>
          <p className="refresh_text">Create New Category</p>
        </button>
        <button type="button" className="refresh_button">
          <FaIcons.FaCog className="refresh_icon"></FaIcons.FaCog>
        </button>
      </div>
      <div className="app__threads">
        <SenderTable
          senders={senders}
          setSenderNameClicked={handleSenderClick}
        ></SenderTable>
        <ThreadTable
          threads={threads}
          setThreadNameClicked={handleThreadClick}
        ></ThreadTable>
      </div>
      <div className="app__main">
        <div className="app__attachments">
          <p
            className={
              workspace === "files"
                ? "app__toolbar__option__title_active"
                : "app__toolbar__option__title"
            }
            onClick={() => setWorkspace("files")}
          >
            Files
          </p>

          <p
            className={
              workspace === "folders"
                ? "app__toolbar__option__title_active"
                : "app__toolbar__option__title"
            }
            onClick={() => setWorkspace("folders")}
          >
            Categories
          </p>
          {workspace == "files" && (
            <AttachmentTable from={"files"} attachments={attachments} />
          )}

          {workspace == "folders" && (
            <div>
              <div className="app__folder__tools">
                <FaIcons.FaBackspace
                  onClick={() => backFolder}
                ></FaIcons.FaBackspace>
                <AddNewFolder addCategory={addCategory} />
              </div>

              <p className="app__folder__selected__title">{folderSelected}</p>
              {folderSelected && backFolderPressed ? (
                <AttachmentTable
                  from={"folders"}
                  filter={folderSelected}
                  attachments={attachmentsForFolders}
                ></AttachmentTable>
              ) : (
                <FolderList
                  setFolderSelected={setFolderSelected}
                  folders={categories}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
