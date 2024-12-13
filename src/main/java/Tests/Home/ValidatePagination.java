package Tests.Home;

import Tests.parent.ParentTest;
import org.testng.annotations.Test;

public class ValidatePagination extends ParentTest {

    @Test
    public void validatePaginationComponent()  {
        homePage.goToTheFortnitePage();
        homePage.VerifyThePaginationComponent();
        homePage.ClickOnNextArrow();
        homePage.ClickOnAnyNumber();
    }
}
