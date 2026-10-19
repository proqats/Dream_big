class Dialog {
    constructor(page) {
        this.page = page
    }

    //Models_Overlays
    async Dalogselements() {
        const Model_Overlay = await this.page.locator('nb-menu ul li').getByText('Modal & Overlays')
        await Model_Overlay.click()

        //Dialog navigation 
        const dialodnav = await this.page.getByText('Dialog')
        await dialodnav.click()

        //Dialog handling

        this.page.on('dialog', async dialog => {
            console.log(`dialog type:  ${dialog.type()}`)
            console.log(`dialog message: ${dialog.message()}`)

            expect(dialog.type()).toBe('Alert')
            expect(dialog.message()).toContain('Lorem ipsum dolor sit amet, consectetur adipiscing elit')

            await dialog.dismiss();
        })
        //Trigger the dialog

        const DialogComponent = await this.page
            .locator('nb-card')
            .filter({ hasText: 'Open Dialog' })
        await DialogComponent
            .getByText('Open Dialog with component')
            .click()

    }
}
//module.exports = { Dialog }

class IframeDialogs {
    constructor(page) {
        this.page = page
    }

    //Models_Overlays
    async IframeDalogselements() {
        const Model_Overlay = await this.page.locator('nb-menu ul li').getByText('Modal & Overlays')
        await Model_Overlay.click()

        //Dialog navigation 
        const dialodnav = await this.page.getByText('Dialog')
        await dialodnav.click()

        //Dialog handling

        this.page.on('dialog', async dialog => {
            console.log(`dialog type:  ${dialog.type()}`)
            console.log(`dialog message: ${dialog.message()}`)

            expect(dialog.type()).toBe('Alert')
            expect(dialog.message()).toContain('')

            await dialog.dismiss();
        })
        //Trigger the dialog

        const frmedialog = await this.page.frameLocator('iframe')
        await frmedialog.getByText('Open Dialog with esc close').click()

    }
}

class tooltips {

    constructor(page) {
        this.page = page
    }

    async Showtooltip() {
        const tooltipbutton = await this.page.getByRole('button',
            { name: "Show Tooltip" })
        await expect(tooltipbutton).toBeVisible()
        await tooltipbutton.hover()

        const toolTiptext = await this.page.locator('nbtooltip')
        await expect(toolTiptext).toBeVisible()
        await expect(toolTiptext).toContainText('This is tooltip')

    }
}

module.exports = { Dialog, IframeDialogs, tooltips }

//conduit.bondaracademy.com //