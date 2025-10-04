async function waitForToastToDisappear(timeout = 20000) {
  const toast = await $("div.toast-message");
  if (await toast.isExisting()) {
    await toast.waitForDisplayed({ reverse: true, timeout });
  }
}

async function safeClick(el, timeout = 15000) {
  await el.waitForDisplayed({ timeout });
  await el.scrollIntoView();
  await el.waitForClickable({ timeout });
  await el.click();
}

module.exports = {
  waitForToastToDisappear,
  safeClick,
};
