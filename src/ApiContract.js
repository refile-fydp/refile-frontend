import { instance } from "./Api"; 

var userId = '';

export function setUserId(userIdFromLogin){
    userId = userIdFromLogin;
}

export async function getFirstAttachments() {
      const arraylist = [];

    var result =  await instance.get('/attachments/' + userId);
    result.data.map((object) => {
        console.log(object);
        arraylist.push(object)
      })
    console.log(arraylist);
    return arraylist;
}

export async function getSyncAttachments() {
    const arraylist = [];

  var result =  await instance.get('/sync-attachments/' + userId);
  result.data.map((object) => {
      console.log(object);
      arraylist.push(object)
    })
  console.log(arraylist);
  return arraylist;
}