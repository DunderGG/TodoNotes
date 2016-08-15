package com.github.klumpen.notes

import slick.driver.H2Driver.api._

object Tables 
{

    class Users(tag: Tag) extends Table[User](tag, "USERS") 
    {
        def id            = column[Int]("ID", O.PrimaryKey, O.AutoInc)
        def name          = column[String]("NAME")
        def email         = column[String]("LOCATION")
    
        def * = (id, name, email) <> (User.tupled, User.unapply)
    }

    class Notes(tag: Tag) extends Table[Note](tag, "NOTES") 
    {
        def id            = column[Int]("ID", O.PrimaryKey, O.AutoInc)
        def userId        = column[Int]("USERID")
        def body          = column[String]("BODY")
        def completed     = column[Boolean]("COMPLETED")
        
        def * = (id, userId, body, completed) <> (Note.tupled, Note.unapply)    
    
        def user = foreignKey("FK_NOTE_USER", userId, users)(_.id)

    }


    val users = TableQuery[Users]
    val notes = TableQuery[Notes]
}