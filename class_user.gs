class User {

  constructor(user = Session.getActiveUser()) {

  }

}


const user = Session.getActiveUser().getEmail();