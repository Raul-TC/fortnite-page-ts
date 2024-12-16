package pages;

import Utils.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.testng.Assert;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class HomePage extends BasePage {

    public HomePage(WebDriver driver){
        super(driver);
    }

    final String BASE_URL = "https://fortniteshopv2.vercel.app";
    String urlChanged = "fortniteshopv2.vercel.app/?page=";
    //Elements
    By rewardsBattlePassTitle = By.cssSelector("div + h2");
    By arrows = By.cssSelector("section + div div[class=\"inline-flex\"] > a"); //1 is left arrow, 2 right arrow
    By numberBlocks = By.cssSelector("section + div a:not(:has(svg))");
    By shopLink = By.cssSelector("a[href=\"/shop\"]");
    By shopIdentifier = By.xpath("//span[text()=\"Siguiente Tienda\"]");
    By cosmeticsLink = By.cssSelector("a[href=\"/cosmetics\"]");
    By cosmeticsIdentifier = By.xpath("//input[@placeholder=\"Jinx Arcane\"]");
    By playerLink = By.cssSelector("a[href=\"/player\"]");
    By playerIdentifier = By.cssSelector("h1");
    private Map<String, String> getQueryParams(String url) {
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
        goToPage(BASE_URL);
    }

    public void verifyThePaginationComponent() {
        String title = getText(rewardsBattlePassTitle);
        logger.debug("Page title: " + title); // Logging page title
        Assert.assertTrue(title.contains("Recompensas del pase de batalla"),"Home Page was not opened");
    }

    public void clickOnNextArrow() {
        List<WebElement> rightArrow = driver.findElements(arrows);

        WebElement arrow = rightArrow.size() == 2 ? rightArrow.get(1) : rightArrow.get(0);
        String actualUrl = driver.getCurrentUrl();
        String newURL = "";

        // Parsear la URL para obtener los parámetros
        Map<String, String> params = getQueryParams(actualUrl);

        // Mostrar los parámetros obtenidos
        logger.debug("URL parameters: " + params); // Logging query parameters


        // Si no hay parámetros, realizar el clic y obtener la nueva URL
        if (params.isEmpty()) {
            logger.info("No query parameters found in the URL.");
            waitForScrollElement(arrows);
            clickElement(false,arrow);

            // Esperar que la página se recargue después del clic
            waitForUrlChange(urlChanged);

            // Obtener la nueva URL después del clic
            newURL = driver.getCurrentUrl();

            // Mostrar la nueva URL
            logger.info("New URL after click: " + newURL); // Logging new URL after click

            // Obtener y mostrar los parámetros de la nueva URL
            Assert.assertFalse(actualUrl.equalsIgnoreCase(newURL));
        }
    }

    public void clickOnAnyNumber(){
        List<WebElement> blocks = driver.findElements(numberBlocks);

        int randomBlock = (int)(Math.random() * blocks.size());
        WebElement block = blocks.get(randomBlock);

       String textBlock = getTextElement(block);
        clickElement(false,block);


        waitForUrlChange(urlChanged+textBlock);
        String currentUrl = driver.getCurrentUrl();

        logger.debug("Clicked on page number: " + textBlock + ", Current URL: " + currentUrl); // Logging click and URL
        assert currentUrl != null;
        Assert.assertTrue(currentUrl.contains("/?page="+textBlock));
    }


    public void clickOnShop(){
        clickElement(shopLink,false);
        String title = getText(shopIdentifier);

        logger.debug("Shop Page opened: " + title); // Logging page title
        Assert.assertTrue(title.contains("Siguiente Tienda"),"Shop Page was not opened");
    }

    public void clickOnCosmetics(){
        clickElement(cosmeticsLink,false);
        WebElement title = waitForElementToBeVisible(cosmeticsIdentifier);
        logger.debug("Cosmetics Page opened"); // Logging page title

        Assert.assertTrue(title.isDisplayed(),"");
    }

    public void clickOnPlayer(){
        clickElement(playerLink,false);
        String title = getText(playerIdentifier);
        logger.debug("Player Page opened: " + title); // Logging page title
        Assert.assertTrue(title.contains("Buscar mis Estadísticas \uD83C\uDFAF"),"Player Page was not opened");
    }


}
