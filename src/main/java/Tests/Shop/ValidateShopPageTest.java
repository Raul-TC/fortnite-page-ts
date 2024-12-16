package Tests.Shop;

import Tests.parent.ParentTest;
import Utils.BasePage;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;
import pages.ShopPage;

public class ValidateShopPageTest extends ParentTest {

    @Test
    public void validateShopPage() throws InterruptedException {
        //ShopPage shopPage = new ShopPage(getDriver());
        ShopPage shopPage = new ShopPage(driver);

        shopPage.goToTheShopPage();
        shopPage.verifyCountdownIsWorking();
        shopPage.getAllSectionShop();
        shopPage.verifyHoverStateOnCard();
    }
}
