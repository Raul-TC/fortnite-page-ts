package Tests.parent;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import pages.HomePage;

public class ParentTest {
    WebDriver webDriver;
    protected HomePage homePage;


    @BeforeMethod
    public void setUp(){

        try {
            System.setProperty("webdriver.chrome.driver", "src\\main\\resources\\chromedriver.exe");
            webDriver = new ChromeDriver();

            webDriver.manage().window().maximize();

            homePage = new HomePage(webDriver);
        }
        catch (Exception e){
            Assert.fail("Can not create driver session");

        }
        }

    @AfterMethod
    public void tearDown() {
        //webDriver.quit();
    }
}
