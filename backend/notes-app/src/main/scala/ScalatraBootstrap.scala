import com.github.klumpen.notes.{DbSetup, NotesController}
import org.scalatra._
import javax.servlet.ServletContext

import slick.driver.H2Driver.api._
import scala.concurrent.Await
import scala.concurrent.duration.Duration

class ScalatraBootstrap extends LifeCycle {

  

  	// JDBC URL, JDBC driver class, and Slick driver class
  	val jdbcUrl = "jdbc:h2:mem:notes;DB_CLOSE_DELAY=-1"
  	val jdbcDriverClass = "org.h2.Driver"
  	// Builds the Database object
  	val db = Database.forURL(jdbcUrl, driver = jdbcDriverClass)

  	val app = new NotesController(db)


    
  
	override def init(context: ServletContext): Unit = {
		
		// Creates the database schema if it doesn't exist
		val res = db.run(DbSetup.createDatabase)

		// Blocks here
		Await.result(res, Duration(5, "seconds"))

		// Mounts the application to /*
		context.mount(app, "/*")
	}

	override def destroy(context: ServletContext) : Unit = {
		db.close()
	}

}
