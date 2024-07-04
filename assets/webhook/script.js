function ntf(message) {
    const ntfs = document.body.querySelectorAll('.notification');

    ntfs.forEach(notification => {
        document.body.removeChild(notification);
    }); 

    var notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = message;

    document.body.appendChild(notification);
    setTimeout(function () {
      notification.style.top = "10px";
      notification.style.opacity = "1";
    }, 10);
  
    setTimeout(function () {
      notification.style.top = "-100px";
      notification.style.opacity = "1";
    }, 5000);
  
    setTimeout(function () {
      document.body.removeChild(notification)
    }, 5600);
  }



  function deletewh(webhook) {
    webhook = webhook.replace(/\s/g, '')
    if (!webhook.startsWith('https://discord.com/api/webhooks/')) {
        ntf('Invalid webhook')
        return
    }
    fetch(webhook, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        if (!response.ok) {
            ntf(`HTTP error! Status: ${response.status}`);
        } else {
            ntf(`Webhook deleted (${response.status})`);
        }
      })

}

