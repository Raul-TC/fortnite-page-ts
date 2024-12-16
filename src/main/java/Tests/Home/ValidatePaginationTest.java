package Tests.Home;

import Tests.parent.ParentTest;
import org.testng.annotations.Test;
import pages.HomePage;

public class ValidatePaginationTest extends ParentTest {

    @Test
    public void validatePaginationComponent()  {
      // HomePage homePage = new HomePage(getDriver());
        HomePage homePage = new HomePage(driver);

        homePage.goToTheFortnitePage();
        homePage.verifyThePaginationComponent();
        homePage.clickOnNextArrow();
        homePage.clickOnAnyNumber();
    }
}
