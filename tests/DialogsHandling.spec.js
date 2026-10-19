
const {test, expect} =require ('@playwright/test')

import {Dialog} from '../Page-objects/models_overlays'
import {IframeDialogs} from '../Page-objects/models_overlays'
import {tooltips} from '../Page-objects/models_overlays'


test('Dialog handling', async ({page})=>{
    const dialog= new Dialog(page)
    await page.goto('https://playground.bondaracademy.com/')
    await dialog.Dalogselements()

})
test('Iframe dialog handling', async ({page})=>{
    const ifrmaeDialog=new IframeDialogs(page)
        await page.goto('https://playground.bondaracademy.com/')

    await ifrmaeDialog.IframeDalogselements()
})
test('tooltip handling', async ({page})=>{

    const ToolTips=new tooltips(page)
    await page.goto('https://playground.bondaracademy.com/')
    await ToolTips.Showtooltip()

})