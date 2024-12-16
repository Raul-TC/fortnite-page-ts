package Tests.Cosmetics;

import Tests.parent.ParentTest;
import Utils.BasePage;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;
import pages.CosmeticsPage;

public class ValidateFilterRarityTest extends ParentTest {


    @Test
    public void validateFiltersRarity(){
        //CosmeticsPage cosmeticsPage = new CosmeticsPage(getDriver());
        CosmeticsPage cosmeticsPage = new CosmeticsPage(driver);

        cosmeticsPage.gotoCosmeticsPage();
        cosmeticsPage.verifyIfSkinsAreDisplayed();
        cosmeticsPage.filterByRarity();
    }

}
