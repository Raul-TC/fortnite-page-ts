package pages;

import Utils.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;

public class PlayerPage extends BasePage {

    public PlayerPage(WebDriver driver){
        super(driver);
    }

    final String BASE_URL = "https://fortniteshopv2.vercel.app/player";

    By inputLocator = By.xpath("//input[@type=\"search\"]");
    By xblLocator = By.xpath("//img[@alt=\"xbl_icon\"]");
    By buttonSeLocator = By.xpath("//button[text()=\"Buscar\"]");
    By loaderLocator = By.cssSelector("div#nprogress");
    By statsPageLocator = By.xpath("//h2[text()=\"Resumen Global\"]");

    String playerName = "lilRauw5505";

    public void goToThePlayerPage(){
        goToPage(BASE_URL);
    }

    public void verifyInputSearchIsDisplayed(){
      WebElement input = waitForElementToBeVisible(inputLocator);

        Assert.assertTrue(input.isDisplayed(),"Input element is not displayed");
    }

    public void enterPlayerName(){
        WebElement input = driver.findElement(inputLocator);

        input.sendKeys(playerName);

        Assert.assertEquals(input.getAttribute("value"), playerName);
    }

    public void clickOnXboxPlatform(){
      WebElement xlbButton = waitForElementToBeClickable(xblLocator);

    String classBefforeClick =  xlbButton.getAttribute("class");

    clickElement(false,xlbButton);

        String classAfterClick =  xlbButton.getAttribute("class");

        logger.debug("before click: "+classBefforeClick+" after click: "+classAfterClick);
        Assert.assertNotEquals(classBefforeClick,classAfterClick);
    }

    public void searchPlayer(){
        clickElement(buttonSeLocator,false);
        waitForElementToBeVisible(loaderLocator);
        logger.info("user searched");
    }

    public void  verifyStatsPlayerAreDisplayed(){
        String globalResume = getText(statsPageLocator);

        Assert.assertTrue(driver.getCurrentUrl().contains("/player?name="+playerName+"&accountType=xbl"));
        Assert.assertEquals(globalResume,"Resumen Global");
    }
}
