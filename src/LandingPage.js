import './LandingPage.css';
import * as FaIcons from "react-icons/fa"
import React, {useEffect, useState} from "react";
import FolderList from './components/FolderList';
import ThreadList from './components/ThreadList';
import { getSyncAttachments, getFirstAttachments, getUserInformation } from './ApiContract';
import AddNewFolder from './AddNewCategory';
import AttachmentsTable from './components/AttachmentsTable';
import MTable from './components/MTable';
import ThreadTable from './components/ThreadTable';
import SenderTable from './components/SenderTable';
import ReactSearchBox from "react-search-box";
import _ from "lodash"

function LandingPage() {

  const threadPresetList = [
    {name: 'Thread1', sender: 'tosh@gmail.com', creation_date: '07/14/2021'},
    {name: 'Thread2', sender: 'tosh@gmail.com', creation_date: '07/14/2021'},
    {name: 'Thread3', sender: 'tosh@gmail.com', creation_date: '07/14/2021'},
  ];

  const quickFiltersList = [
    {name: 'sent by me'},
    {name: 'from past year'},
    {name: 'pdf files'},
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
  const [userInfo, setUserInfo]= useState([]);

  useEffect(() => getAttachments(), [])
  useEffect(() => getUserInfo(), [])
  useEffect(() => threadClicked(), [threadNameClicked])
  useEffect(() => senderClicked(), [senderNameClicked])
  useEffect(() => setThreadsFilter(), [attachments])
  useEffect(() => setSendersFilter(), [attachments])
  useEffect(() => setFolderSelectedState(), [folderSelected])
  useEffect(() => setCategoriesList(), [userInfo])

  
  function addCategory(category) {
    console.log(category.name);
    setCategories([category.name, ...categories]);
    setNewCategories();
  }

  function addQuickFilters(quickFilters) {
    setCategories([quickFilters, ...quickFilters]);
  }

  async function setNewCategories(){
    var result = await postNewCategories();
    
  }


  async function getUserInfo() {
    var userInfo = await getUserInformation();
    console.log(userInfo.categories);
    setUserInfo(userInfo)
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

  function setThreadsFilter() {
    //get the 6 most recent threads based on date. do this by sorting attachments based on date propert
    //then choose top 6, but in new array and return as
    var removedDuplicateThreads = attachments.reduce((unique, o) => {
      if(!unique.some(obj => obj.thread === o.thread)) {
        unique.push(o);
      }
      return unique;
    },[]);
    setThreads(removedDuplicateThreads);
  }

  function setSendersFilter() {
    const myArray = [];
    attachments.forEach(element => {
      myArray.push(element.sender)
    });
    var frequency = {}, value;
    // compute frequencies of each value
    for(var i = 0; i < myArray.length; i++) {
        value = myArray[i];
        if(value in frequency) {
            frequency[value]++;
        }
        else {
            frequency[value] = 1;
        }
    }
    // make array from the frequency object to de-duplicate
    var uniques = [];
    for(value in frequency) {
        uniques.push(value);
    }
    // sort the uniques array in descending order by frequency
    function compareFrequency(a, b) {
        return frequency[b] - frequency[a];
    }
    uniques.sort(compareFrequency);
    setSenders(uniques);
  }

  function threadClicked() {
    var filteredByThreadAttachments = [];

    if (threadNameClicked == "") {
      console.log("clicked on landing page was empty")
    } else {
      attachments.forEach(element => {
        if (element.thread == threadNameClicked){
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
      console.log("clicked on landing page was empty")
    } else {
      attachments.forEach(element => {
        if (element.sender == senderNameClicked){
          console.log("element: " + element.thread);
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
    setBackFolderPressed(true);
  }

  function setFolderSelectedState() {
    setBackFolderPressed(false);
  }
  
  return (
    <div className="app">
      <div className="app__header">
      <p className="header__title">Re:File</p>

        <div className='header__container'>
          <p className="header__subtitle">{userInfo.name}</p>
          <p className="header__subtitle">{userInfo.email}</p>
        </div>
    
        <form className="header__searchform" >
          <ReactSearchBox
            className='header__searchform__input'
            placeholder="Search file names, users, or subjects"
            value="Doe"
            data={attachments}
            callback={(record) => console.log(record)}
          />
          <FaIcons.FaSearch
            className='header__searchform__submit'
            type="submit"
            value="Search">
          </FaIcons.FaSearch> 
        </form>
      </div>

      <div className="app__main">
        <div className="app__threads">
          <SenderTable senders={senders} setSenderNameClicked={handleSenderClick}></SenderTable>
          <ThreadTable threads={threads} setThreadNameClicked={handleThreadClick}></ThreadTable>
        </div>

        <div className="app__attachments">
            <p className='app__toolbar__option__title' onClick={() => setWorkspace("files")}>Files</p>
            <p className='app__toolbar__option__title' onClick={() => setWorkspace("folders")}>Folders</p>
            <FaIcons.FaSync className='refresh' onClick={refreshAttachments}>REFRESH ATTACHMENTS</FaIcons.FaSync>

            {workspace == "files" && 
              <MTable from={'files'} attachments={attachments}/>
            }

            {workspace == "folders" && 
              <div>
                <div className='app__folder__tools'>
                  <FaIcons.FaBackspace onClick={() => backFolder}></FaIcons.FaBackspace>
                  <AddNewFolder addCategory={addCategory}/>
                </div>
                {!folderSelected &&
                <FolderList setFolderSelected={setFolderSelected} folders={categories} /> }
                <p className='app__folder__selected__title'>{folderSelected}</p>
                {folderSelected &&
                  <MTable from={'folders'} filter={folderSelected} attachments={attachments}></MTable>
                }
              </div>
            }    

        </div>
      </div>

    </div>
  );
}

export default LandingPage;
