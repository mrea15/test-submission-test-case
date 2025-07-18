describe('Trust Wallet - Create Wallet Flow (Final Clean Version)', () => {
  it('should create a new wallet', async () => {
    // 1. Tap "Create new wallet"
    const createBtn = await $('~Create new wallet');
    await createBtn.click();

    // 2. Set passcode
    for (const digit of ['1', '2', '3', '4', '5', '6']) {
      await $(`~${digit}`).click();
    }

    // 3. Confirm passcode
    for (const digit of ['1', '2', '3', '4', '5', '6']) {
      await $(`~${digit}`).click();
    }

    // 4. Deny biometric login (jika muncul)
    try {
      const denyBiometric = await $('android=new UiSelector().textContains("Deny")');
      if (await denyBiometric.isDisplayed()) {
        await denyBiometric.click();
      }
    } catch (err) {
      console.log('Biometric prompt not shown, skipping...');
    }

    // 5. Enable notifications (jika muncul)
    try {
      const enableNotif = await $('android=new UiSelector().textContains("Enable notifications")');
      if (await enableNotif.isDisplayed()) {
        await enableNotif.click();
      }
    } catch (err) {
      console.log('Enable notification screen not shown, skipping...');
    }

    // 6. Done
    const doneBtn = await $('~Done');
    await doneBtn.click();

    // 7. Assert: wallet home is shown
    const walletHome = await $('~Tokens');
    await expect(walletHome).toBeDisplayed();
  });
});