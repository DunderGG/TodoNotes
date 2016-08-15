package com.github.klumpen.notes
import com.github.klumpen.notes.NotesDAO._

import org.scalatra._
import org.scalatra.json._

import scalate.ScalateSupport

import slick.driver.H2Driver.api._

import scala.concurrent.{ExecutionContext, Future}

import org.json4s.{DefaultFormats, Formats}

class NotesController(db:Database) extends NotesappStack 
									with ScalateSupport 
									with FutureSupport
									with CorsSupport {

	override protected implicit def executor = scala.concurrent.ExecutionContext.global

	before("/*")
	{
		//contentType = "text/html"
		println("connection made...")
	}

	options("/notes/*")
	{
		println("\nOPTIONS request made...")

		response.setHeader("Access-Control-Allow-Origin", 
							request.getHeader("Access-Control-Request-Origin"))
	}

  	get("/notes/:id")
  	{	
  		println("\nGET request made, for: /notes/:id")

  		NoteDao.notes find (_.id == params("id").toInt) match {
  			case Some(note) => ssp("/notes/show", "note" -> note)
  			case None => halt(404, "not found")
  		}
  	}

  	get("/")
  	{
  		redirect("/notes")
  	}

  	//get("/notes")
  	//{
  	//	println("\nGET request made, for: /notes")
  	//	contentType = "text/html"
  	//	new AsyncResult
  	//	{
  	//		val is = 
  	//		{
  	//			db.run(allNotes) map 
  	//			{ 
  	//				notes => ssp("/notes/show", "notes" -> notes)
  	//			}
  	//		}
  	//	}
  	//}
	get("/notes")
  	{
  		println("\nGET request made, for: /notes")
  		contentType = "application/json"
  		val session = request.getSession(true)
  		println("session: " + session)
  		val html = request.body
  		println("html: " + html);
  		val webappPath = servletContext.getRealPath("/");
  		println("webappPath: " + webappPath)

  		new AsyncResult
  		{
  			val is = 
  			{
  				db.run(allNotes) map 
  				{ 
  					notes => {
  						println("notes: " + (notes.toList))
  					}
  				}
  			}

  		}
  	}
  	post("/notes/new")
  	{
		println("\nPOST request made, for: /notes/new")
		contentType = "application/json"
		new AsyncResult{
			val is = {
				val userId = 1
				val body = params("body")
  				val completed = params("completed").toBoolean
				
	  			db.run(createNote(userId,body,completed))		
			}
		}
		response.setHeader("Access-Control-Expose-Headers", "postResponse");
  		response.addHeader("postResponse", "Success!");
  		println("\n\n****RESPONSE****");
  		println(response);
  		println("****************");
  	}

  	put("/notes/new")
  	{
  		println("\nPUT request made, for: /notes/new")

  		val body = params("body")
  		//val completed = params("completed").toBoolean

	  	val newNote = Note(0, 0, body, false)
	
	  	db.run(createNote(1, body, false))

	  	NoContent()
  	}


}

case class Note(id:Int, userId:Int, body:String, completed:Boolean)

case class User(id:Int, name:String, email:String)

object NoteDao{
	val note1 = Note(1,
		2,
		"Bacon ipsum dolor amet cupidatat picanha reprehenderit capicola",
		false)

	val note2 = Note(2,
		1,
		"Gumbo beet greens corn soko endive gumbo gourd.",
		false)

	val notes = List(note1, note2)
}