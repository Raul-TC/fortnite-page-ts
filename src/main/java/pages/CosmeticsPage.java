package pages;

import Utils.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;

public class CosmeticsPage extends BasePage {

    public CosmeticsPage(WebDriver driver){
        super(driver);
    }

    final String BASE_URL = "https://fortniteshopv2.vercel.app/cosmetics";
    By skinLocator = By.cssSelector("div.infinite-scroll-component div a:nth-child(1)");
    By inputSkinLocator = By.cssSelector("input[name=\"searchSkin\"]");
    By selectRarityLocator = By.xpath("//p[contains(text(),\"RAREZA\")]/..");
    By rarityTypeLocator = By.xpath("//i/span[text()=\"Rara\"]");
    By raritySkinLocator = By.xpath("//div/span[text()=\"bandolera\"]");
    final String SEARCH_SKIN = "Jinx Arcane";
    public void gotoCosmeticsPage(){
        goToPage(BASE_URL);
    }

    public void verifyIfSkinsAreDisplayed(){
        WebElement skinItem = driver.findElement(skinLocator);


        Assert.assertTrue(skinItem.isDisplayed(),"Element is not displayed");
    }

    public void searchSkin(){

        //WebElement inputElement = driver.findElement(inputSkinLocator);
        WebElement inputElement = waitForElementToBeVisible(inputSkinLocator);
        inputElement.click();
        inputElement.sendKeys(SEARCH_SKIN);
       // WebElement skinItem = driver.findElement(skinLocator);
       // wait.until(ExpectedConditions.elementToBeClickable(skinItem));
       // skinItem.click();
    }


    public void filterByRarity(){

        WebElement abc = driver.findElement(selectRarityLocator);

        logger.debug(abc.getText());
        abc.click();
        //clickElement(selectRarityLocator,false);
        clickElement(rarityTypeLocator,false);
        String raritySkin = getText(raritySkinLocator);

       // wait.until(ExpectedConditions.visibilityOfElementLocated(raritySkinLocator));
        Assert.assertEquals(raritySkin, "Bandolera");
    }


    public void clickOnAnySkin(){
        WebElement skinItem = driver.findElement(skinLocator);

        String skinName = getText(skinLocator);

        clickElement(true,skinItem);

        By nameSkinPageLocator = By.xpath("//div/span[text()='"+skinName+"']");

        String skinNamePage = getText(nameSkinPageLocator);

        logger.debug("Click on: "+skinName+" Skin page displayed: "+skinNamePage);

    }
}
