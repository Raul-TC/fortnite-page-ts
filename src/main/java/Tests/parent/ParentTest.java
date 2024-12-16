package Tests.parent;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import pages.HomePage;

public class ParentTest {
    protected WebDriver driver;
    //private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    //public static WebDriver getDriver(){
    //    return driver.get();
    //}

    @BeforeMethod
    public void setUp(){
        try {
            System.setProperty("webdriver.chrome.driver", "src\\main\\resources\\chromedriver.exe");
           // driver.set(new ChromeDriver());
            driver = new ChromeDriver();
           // getDriver().manage().window().maximize();
            driver.manage().window().maximize();
        }
        catch (Exception e){
            Assert.fail("Can not create driver session");
            }
        }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}
