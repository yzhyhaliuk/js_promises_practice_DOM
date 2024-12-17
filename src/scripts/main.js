'use strict';

const notification = document.createElement('div');

notification.setAttribute('data-qa', 'notification');

const promise1 = new Promise((resolve, reject) => {
  let clickHappened = false;

  const clickHandle = () => {
    const textResolve = 'First promise was resolved';

    notification.append(textResolve);

    resolve(notification);
    clickHappened = true;

    document.removeEventListener('click', clickHandle);
  };

  document.addEventListener('click', clickHandle);

  setTimeout(() => {
    if (!clickHappened) {
      const textReject = 'First promise was rejected';

      notification.append(textReject);
      reject(notification);
    }
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const clickHandle = () => {
    const textResolve = 'Second promise was resolved';

    notification.append(textResolve);

    resolve(notification);

    document.removeEventListener('click', clickHandle);
    document.removeEventListener('contextmenu', contextMenuHandle);
  };

  const contextMenuHandle = (e) => {
    e.preventDefault();
    clickHandle();
  };

  document.addEventListener('click', clickHandle);
  document.addEventListener('contextmenu', contextMenuHandle);
});

const promise3 = new Promise((resolve) => {
  let isContextMenuAdded = false;
  const contextMenuHandle = (e) => {
    const textResolve = 'Third promise was resolved';

    e.preventDefault();

    resolve(notification.append(textResolve));
    document.removeEventListener('contextmenu', contextMenuHandle);
  };

  document.addEventListener('click', () => {
    if (!isContextMenuAdded) {
      document.addEventListener('contextmenu', contextMenuHandle);
      isContextMenuAdded = true;
    }
  });
});

promise1.then((result) => {
  notification.className = 'success';
  document.body.append(result);
});

promise1.catch((result) => {
  notification.className = 'error';
  document.body.append(result);
});

promise2.then((result) => {
  notification.className = 'success';
  document.body.append(result);
});

promise3.then((result) => {
  notification.className = 'success';
  document.body.append(result);
});
