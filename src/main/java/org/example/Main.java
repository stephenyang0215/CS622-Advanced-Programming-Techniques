package org.example;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import org.json.simple.parser.ParseException;
import org.slf4j.LoggerFactory;
import org.bson.Document;

import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        System.getenv("PATH");
        System.out.println(System.getenv("PATH"));
        /*
        // configure to show only error logs for db
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        Logger rootLogger = loggerContext.getLogger("org.mongodb.driver");
        rootLogger.setLevel(Level.ERROR);

        //testing for adding a data in
        Database db = new Database();
        Document document = new Document("id", "1").append("name", "John");
        db.collection.insertOne(document);

        TweetsLookup tu = new TweetsLookup();
        tu.parsing(2);*/
    }
}