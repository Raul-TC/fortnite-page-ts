package Tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Test {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\rayad\\Desktop\\QAPractice\\src\\main\\resources\\chromedriver.exe");

        WebDriver driver = new ChromeDriver() ;

        driver.get("https://fortniteshopv2.vercel.app/");

        driver.findElement(By.cssSelector("a[href='/shop']")).click();
        driver.manage().window().maximize();
    }
}
