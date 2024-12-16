package Tests.Home;

import Tests.parent.ParentTest;
import org.testng.annotations.Test;
import pages.HomePage;

public class ValidateNavMenuLinksTest extends ParentTest {

    @Test
    public void validateNavMenuLinks() {
        //HomePage homePage = new HomePage(getDriver());

        HomePage homePage = new HomePage(driver);

        homePage.goToTheFortnitePage();
        homePage.clickOnShop();
        homePage.clickOnCosmetics();
        homePage.clickOnPlayer();
    }
}
