package Tests.Player;

import Tests.parent.ParentTest;
import org.testng.annotations.Test;
import pages.PlayerPage;

public class ValidateSearchPlayerPageTest extends ParentTest {

    @Test
    public void validateSearchPlayerPage(){
        //PlayerPage playerPage = new PlayerPage(getDriver());
        PlayerPage playerPage = new PlayerPage(driver);

        playerPage.goToThePlayerPage();
        playerPage.verifyInputSearchIsDisplayed();
        playerPage.enterPlayerName();
        playerPage.clickOnXboxPlatform();
        playerPage.searchPlayer();
        playerPage.verifyStatsPlayerAreDisplayed();
    }
}
