package pages;

import Utils.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;

import java.util.List;

public class ShopPage extends BasePage {

    public ShopPage(WebDriver driver) {
        super(driver);
    }

    String url = "https://fortniteshopv2.vercel.app/shop";
    By seconds = By.xpath("//div/span[text()=\"Segundos\"]/preceding-sibling::span");
    By titleSections = By.cssSelector("section h2");
    By skinItem = By.cssSelector("section div a:nth-child(1)");

    public void goToTheShopPage() {
        goToPage(url);
    }

    public void verifyCountdownIsWorking() throws InterruptedException {

        String secondsFirstCheck = getText(seconds);

        Thread.sleep(3000);
        String secondsSecondCheck = getText(seconds);

        logger.debug("First check: "+secondsFirstCheck);
        logger.debug("First check: "+secondsSecondCheck);
        Assert.assertFalse(secondsFirstCheck.contentEquals(secondsSecondCheck),"Countdown is Working as Expected");
    }

    public void getAllSectionShop(){
        List<WebElement> allTitles = driver.findElements(titleSections);
        wait.until(ExpectedConditions.visibilityOfAllElements(allTitles));

        allTitles.forEach(i -> {
            //logger.debug(i.getText());

            By skin = By.xpath("//section/h2[text()='"+i.getText()+"']/following-sibling::div/a");

            int quantitySkins = driver.findElements(skin).size();

            logger.debug("Section: "+i.getText()+" quantity: "+quantitySkins);
        });
    }

    public void verifyHoverStateOnCard(){
        WebElement skin = driver.findElement(skinItem);


        // Usa JavaScript para capturar los estilos computados
        JavascriptExecutor js = (JavascriptExecutor) driver;
        String opacityBefore = (String) js.executeScript(
                "return window.getComputedStyle(arguments[0]).getPropertyValue('opacity');",
                skin
        );

        logger.debug("Opacity after hover: " + opacityBefore);
        Actions actions = new Actions(driver);
        actions.moveToElement(skin).perform();

        String opacityAfter = (String) js.executeScript(
                "return window.getComputedStyle(arguments[0]).getPropertyValue('opacity');",
                skin
        );
        //String classNameAfterHover = skin.getAttribute("class");

        logger.debug("Opacity after hover: " + opacityAfter);

        //assert opacityBefore != null;
        Assert.assertNotEquals(opacityBefore, opacityAfter,"Opacity wasn't changed after hover");
    }
}
