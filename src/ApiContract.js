import { instance } from "./Api"; 
import { User } from "./models/User";

var userId = '';

export function setUserId(userIdFromLogin){
    userId = userIdFromLogin;
}

export async function postNewCategories(categories) {
  console.log("categories are: " + categories);
  instance.patch('/users/' + userId, 
	{ 
    categories: categories}, 
	{
		// Config
	}
);
}

export async function getUserInformation() {
  var result =  await instance.get('/users/' + userId);
  var userInfo = new User(result.data.userId, result.data.email, result.data.name, result.data.categories);
  console.log("gangway " + result.data);
  return userInfo;
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