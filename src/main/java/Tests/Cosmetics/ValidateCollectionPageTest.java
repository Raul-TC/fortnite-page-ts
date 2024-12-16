package Tests.Cosmetics;

import Tests.parent.ParentTest;
import org.testng.annotations.Test;
import pages.CosmeticsPage;

public class ValidateCollectionPageTest extends ParentTest {

    @Test
    public void validateCollectionPage(){
        //CosmeticsPage cosmeticsPage = new CosmeticsPage(getDriver());
        CosmeticsPage cosmeticsPage = new CosmeticsPage(driver);

        cosmeticsPage.gotoCosmeticsPage();
        cosmeticsPage.verifyIfSkinsAreDisplayed();
        cosmeticsPage.searchSkin();
    }
}
