package Utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.time.Duration;

public class BasePage{
    protected WebDriver driver;
    protected final Logger logger;
    protected String url;
    protected final WebDriverWait wait;


    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.logger = LogManager.getLogger(this.getClass()); // Configura el logger para cada clase hija
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    public void goToPage(String url) {
        this.url = url;
        driver.get(url);
        getTitlePage(url);
        logger.debug("Page opened: " + url);
    }

    public void getTitlePage(String url){
        try{
            driver.get(url);

        }catch (Exception e){
            logger.error("Failed to open page", e); // Logging failure to load the page
            Assert.fail("Impossible to open page");
        }
    }

    public void clickElement(By locator, boolean needScroll) {
      if(needScroll) waitForScrollElement(locator);

      waitForElementToBeClickable(locator).click();
    }
    public void clickElement(boolean needScroll,WebElement element) {
        if(needScroll) waitForScrollElement(element);

        waitForElementToBeClickable(element).click();

    }

    public String getText(By locator) {
        return waitForElementToBeVisible(locator).getText();
    }

    public WebElement waitForElementToBeVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public String getTextElement(WebElement element) {
        return waitForElementToBeVisibleElement(element).getText();
    }

    public WebElement waitForElementToBeVisibleElement(WebElement element) {
        return wait.until(ExpectedConditions.visibilityOf(element));
    }


    public WebElement waitForElementToBeClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));

    }
    public WebElement waitForElementToBeClickable(WebElement element) {
        return wait.until(ExpectedConditions.elementToBeClickable(element));
    }

    public void waitForScrollElement(By locator) {

        try{
            WebElement element = driver.findElement(locator);
       ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
            wait.until(ExpectedConditions.visibilityOf(element));

        }catch (Exception e){
            logger.error("Failed to click on the arrow: " + e.getMessage());
        }

    }

    public void waitForScrollElement(WebElement waitElement) {

        try{
            ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", waitElement);
            wait.until(ExpectedConditions.visibilityOf(waitElement));

        }catch (Exception e){
            logger.error("Failed to click on the arrow: " + e.getMessage());
        }

    }


    public void waitForUrlChange(String url){
        wait.until(ExpectedConditions.urlContains(url));
    }
}