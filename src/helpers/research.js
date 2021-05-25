import Store from './store';

export async function research(input,tipe) {
    const users = new Store('participants');
    let allUsers = await users.getItems();
    let findRegexp = new RegExp(input + '(.+)?', "i");
    //return false
    return allUsers.filter(user => user.hasOwnProperty(tipe) ? findRegexp.test(user[tipe]) : false);
}