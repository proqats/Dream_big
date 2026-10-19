const { test, expect } = require('@playwright/test')

test('login the application with API post method', async ({ page, request }) => {
    const loginrequest = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {
                "email": "pangabros1@gmail.com",
                "password": "pangabros@1234"
            }
        }
    })
    expect(loginrequest.status()).toEqual(200)
    const loginrequestJson=await loginrequest.json()
    const logintoken=loginrequestJson.user.token
    console.log(logintoken)

})