/**
 * Responsibilities
Product list
Product names
Product prices
Product images
Sort dropdown
Add To Cart buttons
Cart icon
 */
/**
 * Login
Verify Products Count
Verify Product Names
Verify Product Prices
Verify Product Images
Verify Sort Dropdown Options
Add Product To Cart
Verify Cart Badge Count
Open Cart
Remove Product
Logout
 */
export class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    //.inventory_item
    async getInventoryItems() {
        return this.page.locator('.inventory_item .inventory_item_name ')
            .allTextContents()
    }
    async getInventoryItemPrice() {
        return this.page.locator('.inventory_item .inventory_item_price ')
            .allTextContents()

    }
    async Sorting() {
        await this.page.locator('.product_sort_container').click()

    }
    async sortingperticularoption() {
        return  this.page.locator('.product_sort_container')
    }
}