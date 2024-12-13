package pages;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class HomePage {

    WebDriver webDriver;
    private static final Logger logger = LogManager.getLogger(HomePage.class);

    public HomePage(WebDriver webDriver){
        this.webDriver = webDriver;
    }

    //Elements
    By rewardsBattlePassTitle = By.cssSelector("div + h2");
    By arrows = By.cssSelector("section + div div[class=\"inline-flex\"] > a"); //1 is left arrow, 2 right arrow
    By numberBlocks = By.cssSelector("section + div a:not(:has(svg))");

    private static Map<String, String> getQueryParams(String url) {
        Map<String, String> queryPairs = new HashMap<>();
        try {
            URI uri = new URI(url);
            String query = uri.getQuery();
            logger.debug("Query string: " + query); // Logging query string

            if (query != null) {
                String[] pairs = query.split("&");
                for (String pair : pairs) {
                    String[] keyValue = pair.split("=");
                    if (keyValue.length == 2) {
                        queryPairs.put(URLDecoder.decode(keyValue[0], StandardCharsets.UTF_8), URLDecoder.decode(keyValue[1], StandardCharsets.UTF_8));
                    }
                }
            }
        } catch (Exception e) {
            logger.error("Error parsing URL query parameters", e); // Logging errors
        }
        return queryPairs;
    }
    // method for opening login page
    public void goToTheFortnitePage() {
        try{
            webDriver.get("https://fortniteshopv2.vercel.app");

            String title = webDriver.findElement(rewardsBattlePassTitle).getText();
            WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(20));
            wait.until(ExpectedConditions.visibilityOfElementLocated(rewardsBattlePassTitle));
            logger.info("Page title: " + title); // Logging page title

            Assert.assertTrue(title.contains("Recompensas del pase de batalla"),"Home Page was not opened");
        }catch (Exception e){
            logger.error("Failed to open the Fortnite page", e); // Logging failure to load the page
            Assert.fail("Impossible to open Login page");
        }
    }

    public void VerifyThePaginationComponent() {
        String title = webDriver.findElement(rewardsBattlePassTitle).getText();
        logger.info("Page title: " + title); // Logging page title
        Assert.assertTrue(title.contains("Recompensas del pase de batalla"),"Home Page was not opened");
    }

    public void ClickOnNextArrow() {
        List<WebElement> rightArrow = webDriver.findElements(arrows);

        WebElement arrow = rightArrow.size() == 2 ? rightArrow.get(1) : rightArrow.get(0);
        String actualUrl = webDriver.getCurrentUrl();
        String newURL = "";

        // Parsear la URL para obtener los parámetros
        Map<String, String> params = getQueryParams(actualUrl);

        // Mostrar los parámetros obtenidos
        logger.debug("URL parameters: " + params); // Logging query parameters

        if (params.isEmpty()) {
            logger.info("No query parameters found in the URL."); // Logging when no params are found
        }

        // Si no hay parámetros, realizar el clic y obtener la nueva URL
        if (params.isEmpty()) {
            ((JavascriptExecutor) webDriver).executeScript("arguments[0].scrollIntoView(true);", arrow);
            arrow.click();
            // Esperar que la página se recargue después del clic
            WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(20));
            wait.until(ExpectedConditions.urlContains("fortniteshopv2.vercel.app/?page="));

            // Obtener la nueva URL después del clic
            newURL = webDriver.getCurrentUrl();

            // Mostrar la nueva URL
            logger.info("New URL after click: " + newURL); // Logging new URL after click

            // Obtener y mostrar los parámetros de la nueva URL

            System.out.println(actualUrl+"actualURL"+newURL+"NEW URL");
            Assert.assertFalse(actualUrl.equalsIgnoreCase(newURL));
        }
    }

    public void ClickOnAnyNumber(){
        List<WebElement> blocks = webDriver.findElements(numberBlocks);

        int randomBlock = (int)(Math.random() * blocks.size());
        WebElement block = blocks.get(randomBlock);

       String textBlock = block.getText();
        block.click();
        WebDriverWait wait = new WebDriverWait(webDriver, Duration.ofSeconds(20));
        wait.until(ExpectedConditions.urlContains("fortniteshopv2.vercel.app/?page="+textBlock));
        String currentUrl = webDriver.getCurrentUrl();

        logger.info("Clicked on page number: " + textBlock + ", Current URL: " + currentUrl); // Logging click and URL
        assert currentUrl != null;
        Assert.assertTrue(currentUrl.contains("/?page="+textBlock));
    }
}
