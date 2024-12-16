package Tests.Cosmetics;

import Tests.parent.ParentTest;
import Utils.BasePage;
import org.testng.annotations.Test;
import pages.CosmeticsPage;
import pages.ShopPage;

public class ValidateSkinPageTest extends ParentTest {

    @Test
    public void validateSkinPage(){
//        CosmeticsPage cosmeticsPage = new CosmeticsPage(getDriver());
        CosmeticsPage cosmeticsPage = new CosmeticsPage(driver);

        cosmeticsPage.gotoCosmeticsPage();
        cosmeticsPage.verifyIfSkinsAreDisplayed();
        cosmeticsPage.clickOnAnySkin();

    }
}
