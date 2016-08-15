package com.github.klumpen.notes

import org.scalatra.{ActionResult, NotFound, Ok}
import slick.dbio.DBIO
import slick.driver.H2Driver.api._
import Tables._

import scala.concurrent.ExecutionContext

import scalaz._, Scalaz._

object NotesDAO
{
	def allNotes: DBIO[Seq[Note]] = notes.result

	def createNote(userId:Int, body:String, completed:Boolean): DBIO[Note] = 
	{
		println("dao: running createNote(1): ")
		println("userId: " + userId + ", body: \"" + body + "\", completed: " + completed)

		val insertQuery = notes
			.map (r => (r.userId, r.body, r.completed))
			.returning(notes.map(_.id))
			.into {
				case ((userId, body, completed), id) =>
					Note(id, userId, body, completed)
			}

		
      	insertQuery += (userId, body, completed)
    	
		
		

		//val insertNote: DBIO[Int] = {
		//	notes += Note(0, userId, body, completed)
		//}
		
	}

	def createNote(newNote:Note): DBIO[Note] = 
	{
		println("dao: running createNote(2): ")
		println("userId: " + newNote.userId + ", body: \"" + newNote.body + "\", completed: " + newNote.completed)
		val userId = newNote.userId
		val body = newNote.body
		val completed = newNote.completed

		val insertQuery = notes
			.map (r => (r.userId, r.body, r.completed))
			.returning(notes.map(_.id))
			.into {
				case ((userId, body, completed), id) =>
				Note(id, userId, body, completed)
			}
		insertQuery += (0, body, false)
		
	}

}