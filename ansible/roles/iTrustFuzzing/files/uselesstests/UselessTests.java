package uselesstests;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class UselessTests 
{
	private static final File junitFile = new File("junitResult.xml"); // This is the path of the junit result file
	private static boolean className = false;
	private static boolean testName = false;
	private static boolean failedSince = false;
	private static boolean failed = false;
	private static String clazz = null;
	private static String testCase = null;
	private static Map<String, String> passedCases = new HashMap<>();
	private static Set<String> listOfTestCases = new HashSet<>();
	
	public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException 
	{
		if(!junitFile.exists())
		{
			System.err.println("Cannot find junitResult.xml at specified path: " + junitFile.getAbsolutePath());
			System.exit(1);
		}
		
		SAXParserFactory factory = SAXParserFactory.newInstance();
		SAXParser parser = factory.newSAXParser();
		
		// TODO iterate over all the files to calculate the useless test cases
		
		parser.parse(junitFile, new SaxHandler());
		
		try(PrintWriter writer = new PrintWriter(new FileWriter("uselessTests.txt")))
		{
			writer.println("Total number of useless tests: " + passedCases.size());
			writer.println("");
			writer.println("-------------------------------------------");
			writer.println("Test name -> Class name");
			writer.println("-------------------------------------------");
			passedCases.forEach((testName, clazz) -> {
				writer.printf("%s -> %s\n", testName, clazz);
			});
		}
	}
	
	private static class SaxHandler extends DefaultHandler
	{

		@Override
		public void startElement(String uri, String localName, String qName, Attributes attributes)
				throws SAXException 
		{
			switch(qName)
			{
			case "className":
				className = true;
				break;
			case "testName":
				testName = true;
				break;
			case "failedSince":
				failedSince = true;
				break;
			case "case":
				className = false;
				testName = false;
				failedSince = false;
				failed = false;
				break;
			}
			
			super.startElement(uri, localName, qName, attributes);
		}

		@Override
		public void characters(char[] ch, int start, int length) throws SAXException {
			
			if(className)
			{
				clazz = String.copyValueOf(ch, start, length);
			}
			else if(testName)
			{
				testCase = String.copyValueOf(ch, start, length);
			}
			else if(failedSince)
			{
				int failedSinceVal = Integer.parseInt(String.copyValueOf(ch, start, length));
				if(failedSinceVal > 0)
					failed = true;
				else
					failed = false;
			}
			
			super.characters(ch, start, length);
		}
		
		@Override
		public void endElement(String uri, String localName, String qName) throws SAXException {
			
			switch(qName)
			{
			case "className":
				className = false;
				break;
			case "testName":
				testName = false;
				break;
			case "failedSince":
				failedSince = false;
				break;
			case "case":
				finalizeCase();
				break;
			}
			
			super.endElement(uri, localName, qName);
		}
		
		public void finalizeCase() 
		{ 
			if(failed)
			{
				passedCases.remove(testCase);
			}
			else if(!listOfTestCases.contains(testName))
			{
				listOfTestCases.add(testCase);
				passedCases.put(testCase, clazz);
			}
		}
	}

}
