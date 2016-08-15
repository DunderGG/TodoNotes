package com.github.klumpen.notes

import slick.driver.H2Driver.api._
import scala.concurrent.ExecutionContext.Implicits._

import slick.jdbc.ResultSetAction
import slick.jdbc.GetResult._

import Tables._

object DbSetup 
{
	def testTableExists(tableName: String): DBIO[Boolean] = {
		def localTables: DBIO[Vector[String]] =
      		ResultSetAction[(String,String,String, String)](_.conn.getMetaData().getTables("", "", null, null)).map { ts => 
      			ts.filter(_._4.toUpperCase == "TABLE").map(_._3).sorted
			}
		localTables map (_.exists(_.toLowerCase == tableName.toLowerCase))
	}

	


	val insertUsers: DBIO[Option[Int]] = 
	{
		users ++= Seq(
			User(1, "Bob", "bob@boblaw.com"),
			User(2, "Bill", "bill@boblaw.com")
		)
	}

	val insertNotes: DBIO[Option[Int]] = 
	{
		notes ++= Seq(
			Note(1, 1, "This is the first note", false),
			Note(2, 2, "This is the second note", true),
			Note(3, 1, "This is the third note", false)
		)
	}

	// create schema if it not exists
	val createDatabase: DBIO[Unit] = 
	{
    	val createDatabase0: DBIO[Unit] = for 
    	{
      	_ <- (notes.schema ++ users.schema).create
      	_ <- insertUsers
      	_ <- insertNotes
    	} yield ()

    	for 
    	{
      		exists <- testTableExists("users")
      		_ <- if (!exists) createDatabase0 else DBIO.successful()
    	} yield ()
    }

    // drop schema if it exists
	val dropDatabase: DBIO[Unit] = 
	{
    	testTableExists("users") flatMap 
    	{
			case true => (notes.schema ++ users.schema).drop
			case false => DBIO.successful()
		}
	}
}