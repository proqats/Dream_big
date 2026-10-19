const {test, expect}=require('@playwright/test')
test('select dropdown', async ({page})=>{
        console.log('TEST STARTED');
///With count methode
    await page.goto('https://www.qa-practice.com/elements/select/mult_select')
    /*const language= page.locator('[id="id_choose_language"] option')
    console.log('count:', await language.count())

    for(let i=0; i<await language.count(); i++){
        console.log(await language.nth(i).innerText())
    }*/

    const languages = await page.locator('[id="id_choose_language"] option').allInnerTexts()
        console.log('languages', languages)

    for (let i=0; i<languages.length; i++){
        if(languages[i].trim() ==='Java'){
            await page . locator ('#id_choose_language').selectOption('Java')

        }
    }




})